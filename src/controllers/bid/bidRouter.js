const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const bidHelper = require('../../middlewares/bidHelper.middleware');
const userHelper = require('../../middlewares/userHelper.middleware');
const jobHelper = require('../../middlewares/jobHelper.middleware');
const jobModel = require('../../models/bidModel').bidModel;

router.use(bodyParser.json());

router.post('/createBid',(req,res) => { 
  let validUserId;
  let referenceUserModel;
  let validPostId;
  let referencePostModel;
  let bidData;
  let model = new jobModel({
    "referencePostId":req.body.postId,
    "amount":req.body.amount,
    "timeOfBid":new Date(),
    "userId":req.body.userId
  })

  if(req.body.amount <= 0){
    res.json({
      success:false,
      message:"Invalid amount"
    })
  }else{
    //check if the userid is valid
  let userModels = userHelper.getUserData(req.body.userId);
  userModels.then((data) => {
    //Check valid user id
    if(data.length == 0){
      validUserId=false;
    }else{
      validUserId=true;
      referenceUserModel = data[0]
    }
    return jobHelper.getJobData(req.body.postId);
  }).then((data) => {
    //Check valid job id
    if(data.length == 0){
      validPostId=false;
    }else{
      validPostId=true;
      referencePostModel = data[0];
    }
  }).then(() => {
    if(validUserId && validPostId){
      model.save().then((data) => {
        bidData = data;
        referencePostModel.bids.push(bidData._id);
        referencePostModel.numberOfBids = referencePostModel.bids.length;
        if(referencePostModel.lowestAmountBid == 0){
          referencePostModel.lowestAmountBid = bidData.amount
        }else{
          if(referencePostModel.lowestAmountBid > bidData.amount){
            referencePostModel.lowestAmountBid = bidData.amount
          }
        }
        return referencePostModel.save();
      }).then((data) =>{
          referenceUserModel.bids.push(bidData.referencePostId);
          return referenceUserModel.save();
        }).then((data) => {
            res.json({
              success: true,
              message:"Bid successfully submitted",
              data:bidData
            })
          })
    }else{
      res.json({
        success: false,
        message:"UserId or JobId is invalid",
        data:null
      })
    }
  })
  }
})

module.exports = router;