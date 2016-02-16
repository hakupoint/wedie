"use strict";
import mongoose from 'mongoose';
const Schema   = mongoose.Schema;

let Token = new Schema({
  token: String,
  expires_in: Number,
  create_at: {type: Date,default: Date.now}
});

mongoose.model('Token',Token);
