"use strict";

import https from 'https';
import mongoose from 'mongoose';
let Token = mongoose.model('Token');
let get_access_token = () => {
  https.get(access_token_url,function(res){
    let _data = '';
    res.on('data',(data)=>{
      _data += data;
    });
    res.on('end',()=>{
      save_token(JSON.parse(_data));
    })
  });
}

let save_token = (obj) =>{
  Token.findOne(function(err,results){
    if(!results){
      new Token({
        token: obj.access_token,
        expires_in: obj.expires_in
      }).save();
    }else{
      results.token = obj.access_token;
      results.expires_in = obj.expires_in;
      results.save();
    }
  });
}

let get_token = (cb) =>{
  Token.findOne((err, results) =>{
    if(err || !results){
      console.error(err);
      get_access_token();
      return false;
    }
    cb(results);
  });
}

let check_expire = () =>{
  get_token((obj)=>{
    var time = new Date().getTime() / 1000;
    if(!time_diff(obj.create_at,obj.expires_in)){
      get_access_token();
    }
  });
  let time_diff = (create_at,expires_in = expires_in) => {
    let now_time = new Date().getTime() / 1000;
    return (new Date(create_at).getTime()) / 1000 + expires_in - now_time > 0;
  }
}


setInterval(check_expire,6000);

export {get_access_token};
