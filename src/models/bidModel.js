const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bidSchema = new Schema({
  referencePostId:{
    type:Schema.Types.ObjectId,
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  timeOfBid:{
    type:Date,
    required:true
  },
  userId:{
    type:Schema.Types.ObjectId,
    required:true
  }
},{
  collection:'bids'
})

let bidModel = mongoose.model('bids',bidSchema);

module.exports = {
  modelName:'bids',
  bidModel:bidModel
}