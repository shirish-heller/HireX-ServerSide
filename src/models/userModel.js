const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userEnum = require('../utils/userEnum');

var userSchema = new Schema({
  firstName:{
    type:String,
    trim:true,
    maxlength:64
  },
  lastName:{
    type:String,
    trim:true,
    maxlength:64
  },
  username:{
    type:String,
    trim:true,
  },
  password:{
    type:String,
    minlength: 6,
    maxlength: 128,
    required:true
  },
  email:{
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: userEnum.roles
  },
  wallet:{
    type:Number,
    required:true
  },
  bids:{
    type:Array
  },
  posts:{
    type:Array
  }
},{
  collection: 'user' 
});

let userModel = mongoose.model('user',userSchema);

module.exports = {
  modelName:'user',
  userModel:userModel
}