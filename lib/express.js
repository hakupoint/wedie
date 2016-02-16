"use strict";
import {dbIp,dbName} from '../config/db.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import getRawBody from 'raw-body';
import typer from 'media-typer';

let connect = () =>{
  mongoose.connect(`mongodb://${dbIp}/${dbName}`);
}
connect();
mongoose.connection.on('error',console.error);
mongoose.connection.on('disconnected',connect);
mongoose.connection.once('open',()=>{console.log('mongodb connect');});

export function loadModule(app,express){
  // app.use(bodyParser.json());
  // app.use(bodyParser.raw());

  app.use((req, res, next) => {
    if(req.method == 'GET'){
      return next();
    }
    getRawBody(req, {
      encoding: typer.parse(req.headers['content-type']).parameters.charset
    },  (err, string) => {
      if (err) return next(err)
      req.text = string
      next()
    });
  })
}
