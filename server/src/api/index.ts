import express from 'express';
import {mongoClient} from '../mongo/connection';
const router = express.Router();

const agg = [
  {
    '$group': {
      '_id': null, 
      'categories': {
        '$addToSet': '$category'
      }
    }
  }
];
router.get('/categories', async (_, res) => {
    const coll = mongoClient.db('ec').collection('products');
    const cursor = coll.aggregate(agg);
    const result = await cursor.toArray();
    return res.send(result[0]);
});

router.use((_, res) => {
    res.status(403).send({
        message: "Not found"
    });
});

export default router;