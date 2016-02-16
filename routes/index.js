"use strict";
import {signature} from '../util/signature.js';
import {reply} from '../util/message.js';

export function route(app,express){
  app.get('/',(req,res)=>{
      signature(req,res);
  });
  app.post('/',(req,res)=>{
    reply(req,res)
  });
}
