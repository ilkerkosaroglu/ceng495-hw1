import express from 'express';
import { mongoClient } from '../mongo/connection';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.put('/:userId/edit', async (req, res) => {
  const coll = mongoClient.db('ec').collection('users');
  const id = req.params.userId;
  if (!id) return res.status(400).send();
  const rating = Number(req.body.rating) || null;
  const comment = req.body.comment || null;
  let newReview: Object = {to: new ObjectId(req.body.productId), rating, comment};
  newReview = Object.fromEntries(Object.entries(newReview).filter(([_,v])=>v!==null));

  // upsert and positional operator $ is not supported for embedded arrays.
  // so what we do is try to update the review, and if it doesn't exist, we insert it.
  await coll.updateOne({_id: new ObjectId(id), 'reviews.to': new ObjectId(req.body.productId)}, {$set: {'reviews.$': newReview}});
  await coll.updateOne({_id: new ObjectId(id)}, {$addToSet: {'reviews': newReview}});
  return res.status(200).send();
});

export default router;