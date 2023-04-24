import express from 'express';
import {mongoClient} from '../mongo/connection';
import { ObjectId } from 'mongodb';
const router = express.Router();

router.get('/:category', async (req, res) => {
    const coll = mongoClient.db('ec').collection('products');
    const products = coll.find({category: req.params.category});
    const result = await products.toArray();
    return res.send(result);
});

router.delete('/:productId', async (req, res) => {
    console.log("del:", req.body);
    const coll = mongoClient.db('ec').collection('products');
    coll.deleteOne({_id: new ObjectId(req.params.productId)});
});
router.put('/new', async (req, res) => {
    console.log("new:", req.body);
    const coll = mongoClient.db('ec').collection('products');
    let data = {...req.body, price: Number(req.body.price)};
    data = Object.fromEntries(Object.entries(data).filter(([_,v])=>v!==null));
    await coll.insertOne(data);
    return res.status(200).send();
});

export default router;