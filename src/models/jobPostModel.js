var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const jobEnum = require('../utils/jobStatusEnum');

var jobPostSchema = new Schema({
  title:{
    type:String,
    required:true,
    maxlength:64
  },
  details:{
    type:String,
    required:true,
    maxlength:180
  },
  deadline:{
    type:Date,
    required:true
  },
  technologies:{
    type:Array,
  },
  price:{
    type:Number,
    required:true
  },
  status:{
    type:jobEnum,
    required:true
  },
  tags:{
    type:Array,
  },
  userId:{
    type:Schema.Types.ObjectId,
    required:true
  },
  bids:{
    type:Array
  },
  lowestAmountBid:{
    type:Number,
    default:0
  },
  numberOfBids:{
    type:Number,
    default:0
  }
},{
  collection:'jobPost'
});

let jobModel = mongoose.model('jobPost',jobPostSchema);
module.exports = {
  modelName:'jobPost',
  jobModel:jobModel
}