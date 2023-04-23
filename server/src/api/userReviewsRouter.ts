import express from 'express';
import { mongoClient } from '../mongo/connection';
import { ObjectId } from 'mongodb';
const router = express.Router();
const agg1 = (id: string) => [
  {
    $match:
    {
      _id: new ObjectId(id),
    },
  },
  {
    $unwind:
    {
      path: "$reviews",
      preserveNullAndEmptyArrays: false,
    },
  },
  {
    $lookup:
    {
      from: "products",
      localField: "reviews.to",
      foreignField: "_id",
      as: "reviewedProductNames",
      pipeline: [
        {
          $project: {
            name: 1,
            category: 1
          },
        },
      ],
    },
  },
  {
    $addFields:
    {
      reviews: {
        productName: {
          $first: "$reviewedProductNames.name",
        },
        category: {
          $first: "$reviewedProductNames.category",
        },
      },
    },
  },
  {
    $unset:
      "reviewedProductNames",
  },
  {
    $group:
    {
      _id: null,
      avgRating: {
        $avg: "$reviews.rating",
      },
      reviews: {
        $push: "$reviews",
      },
    },
  }
]
const agg = (id: string) => [
  { $match: { _id: new ObjectId(id) } },
  {
    $unwind: {
      path: "$reviews",
      preserveNullAndEmptyArrays: true,
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "reviews.to",
      foreignField: "_id",
      let: {
        comment: "$reviews.comment",
        rating: "$reviews.rating",
      },
      pipeline: [
        {
          $project: {
            productName: "$name",
            category: 1,
            comment: "$$comment",
            rating: "$$rating",
            to: "$_id"
          },
        },
      ],
      as: "reviews",
    }
  },
  {
    $unwind: {
      path: "$reviews",
      preserveNullAndEmptyArrays: true,
    }
  },
  {
    $group: {
      _id: null,
      avgRating: {
        $avg: "$reviews.rating",
      },
      reviews: {
        $push: "$reviews",
      },
    }
  }
]
router.post('/', async (req, res) => {
  const coll = mongoClient.db('ec').collection('users');
  const id = req.body.userId;
  if (!id) return res.status(400);
  const userReviews = coll.aggregate(agg(id));
  const result = await userReviews.toArray();
  return res.send(result[0]);
});

export default router;