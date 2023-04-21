import express from 'express';
import {mongoClient} from '../mongo/connection';
import { ObjectId } from 'mongodb';
const router = express.Router();
const agg = (id:string)=>[
  {
    $match:
      {
        _id: new ObjectId(id),
      },
  },
  {
    $lookup:
      {
        from: "users",
        localField: "_id",
        foreignField: "reviews.to",
        as: "reviews",
        pipeline: [
          {
            $unwind: "$reviews",
          },
          {
            $match: {
              "reviews.to": new ObjectId(id),
            },
          },
          {
            $project: {
              username: 1,
              rating: "$reviews.rating",
              comment: "$reviews.comment",
            },
          },
        ],
      },
  },
];
router.get('/:productId', async (req, res) => {
    const coll = mongoClient.db('ec').collection('products');
    const productWithReviews = coll.aggregate(agg(req.params.productId));
    const result = await productWithReviews.toArray();
    return res.send(result[0]);
});

export default router;