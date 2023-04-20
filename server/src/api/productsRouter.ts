import express from 'express';
import {mongoClient} from '../mongo/connection';
const router = express.Router();

router.get('/:category', async (req, res) => {
    const coll = mongoClient.db('ec').collection('products');
    const products = coll.find({category: req.params.category});
    const result = await products.toArray();
    return res.send(result);
});

export default router;