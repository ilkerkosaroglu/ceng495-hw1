
var http = require('http');
import { run } from './mongo/connection';
import api from './api';
run().catch(console.dir);

//import express
import express from 'express';

const app = express();
app.use(express.json());
app.use('/api', api);

// development port
const port = 8082;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

console.log("init finished");