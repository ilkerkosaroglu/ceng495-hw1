import express from 'express';
import {mongoClient} from '../mongo/connection';
import productsRouter from './productsRouter';
import productInfoRouter from './productInfoRouter';
const router = express.Router();

const agg = [
  {
    '$sortByCount': '$category'
  }, {
    '$addFields': {
      'name': '$_id'
    }
  }, {
    '$sort': {
      'name': 1
    }
  }
];
router.get('/categories', async (_, res) => {
    const coll = mongoClient.db('ec').collection('products');
    const cursor = coll.aggregate(agg);
    const result = await cursor.toArray();
    return res.send(result);
});

router.use('/products', productsRouter);

router.use('/productInfo', productInfoRouter);

router.use((_, res) => {
    res.status(403).send({
        message: "Not found"
    });
});

export default router;