import express from 'express';
import {mongoClient} from '../mongo/connection';
import bcrypt from "bcrypt";
import { Collection } from 'mongodb';
const router = express.Router();
const saltRounds = 10;

router.post('/', async (req, res) => {
    const coll = mongoClient.db('ec').collection('users');
    let {username, password} = req.body;
    password ||= '';
    if(!username) return res.status(400).send({message: "No username specified"});
    const user = await coll.findOne({username});
    if(!user){
        return res.status(404).send({message: "User not found."});
    }
    if(!user.hash){
        return res.send(user);
    }
    const match = await bcrypt.compare(password, user.hash);
    if(!match) return res.status(401).send({message: "Wrong password."});
    return res.send(user);
});

const updateUser = async (collection:Collection, username:string, hash?:string, )=>{
    return collection.findOneAndUpdate({username: username}, {
        $set:{
            hash,
        },
        $setOnInsert: {
            username
        }
    }, {upsert:true, returnDocument: 'after'}).then(res=>res.value);
};

router.post('/signup', async (req, res) => {
    const coll = mongoClient.db('ec').collection('users');
    let {username, password} = req.body;
    username ||= undefined;
    password ||= undefined;
    if(!username) return res.status(400).send({message: "No username specified"});
    const user = await coll.findOne({username});
    //check if password protected user exists or user exists and we are trying to signup without a password
    if(user && (user.hash || !password)) {
        //error, user exists
        return res.status(409).send({message: "User already exists."});
    }
    // update user or create if it doesn't exist yet.
    // user with no passwords
    if(!password){
        return res.send(await updateUser(coll, username));
    }
    // use passwords
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await updateUser(coll, username, hashedPassword);
    return res.send(newUser);
});

export default router;