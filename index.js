"use strict";
import express from "express";
import {port} from './config/setting.js';
import './models/index.js';
import {loadModule} from './lib/express.js';
import {route} from './routes/index.js';
let app      = express();
loadModule(app,express)
route(app,express);


app.use((err, req, res, next) =>{
  console.error(err.stack);
  next(err);
});
app.use((err, req, res, next) =>{
  res.status(500);
  res.send('server is down');
});

app.listen(port)
