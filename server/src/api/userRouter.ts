import express from 'express';
import { mongoClient } from '../mongo/connection';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.delete('/:userId', async (req, res) => {
  const coll = mongoClient.db('ec').collection('users');
  const id = req.params.userId;
  if (!id) return res.status(400).send();
  await coll.deleteOne({_id: new ObjectId(id)});
  return res.status(200).send();
});

export default router;