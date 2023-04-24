
var http = require('http');
import { run } from './mongo/connection';
import api from './api';
import path from 'path';
run().catch(console.dir);

//import express
import express from 'express';

const app = express();
app.use(express.json());

//static files for frontend
const stPath = path.join(__dirname, '..', '..', "renderApp", "build");
app.use(express.static(stPath));
app.get("/", (req, res) => {
    res.sendFile(path.join(stPath, "index.html"));
});

app.use('/api', api);

const port = 80;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

console.log("init finished");