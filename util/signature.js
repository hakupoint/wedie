"use strict";

import {token, access_token_url, expires_in} from '../config/weixin.js';
import sha1 from 'sha1';
let signature = (req,res) =>{

  let {signature,timestamp,nonce,echostr} = req.query;
  let str = sha1(new Array(token,timestamp,nonce).sort().join(''));
  if(signature == str){
    res.send(echostr);
    return true;
  }
  res.send('signature is error');
}

export {signature};
