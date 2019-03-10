const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const userHelper = require('../../middlewares/userHelper.middleware');
const jobHelper = require('../../middlewares/jobHelper.middleware');

router.use(bodyParser.json());

router.get('/getUserData',(req,res) => {
    let userModels = userHelper.getUserData(req.body.userId);
    userModels.then((data) => {
      if(data.length == 0){
        res.json({
          success:true,
          message:"User not found",
          data:null
        })
      }else{
        let userData = data[0];
        res.json({
          success:true,
          message:"User found",
          data:{
            _id:userData._id,
            firstName:userData.firstName,
            lastName:userData.lastName,
            username:userData.username,
            email:userData.email,
            role:userData.role,
            wallet:userData.wallet
          }
        })
      }
    })
  });

  // updating user data
router.put('/updateUserData',(req,res) => {
    let userModels = userHelper.getUserData(req.body.userId);
    userModels.then((data) => {
      if(data.length == 0){
        res.json({
          success:true,
          message:"User not found",
          data:null
        })
      }else{
        let userData = data[0];
        userData.firstName = req.body.firstName ? req.body.firstName : userData.firstName;
        userData.lastName = req.body.lastName ? req.body.lastName : userData.lastName;
        userData.username = req.body.username ? req.body.username : userData.username;
        userData.email = req.body.email ? req.body.email : userData.email;
        userData.role = req.body.role ? req.body.role : userData.role;
    
        userData.save(function(err, data){
          if(err){
            throw err;
          }else{
            res.json({
              "success":true,
              "message":"User successfully update",
              "data":{
                _id:userData._id,
                firstName:userData.firstName,
                lastName:userData.lastName,
                username:userData.username,
                email:userData.email,
                role:userData.role
              }
            })
          }
        })
      }
    })
  });

  
router.delete('/deleteUserData',(req,res) => {
    let userModels = userHelper.getUserData(req.body.userId);
    userModels.then((data) => {
      if(data.length == 0){
        res.json({
          success:true,
          message:"User not found",
          data:null
        })
      }else{
        let userData = data[0];
        userData.delete(function(err,data){
          if(err){
            throw err;
          }else{
            res.json({
              success:true,
              message:"User deleted successsfully",
              data:null
            })
          }
        })
      }
    })
  })

  
router.get('/getMyBids',(req,res) => {
    let userModels = userHelper.getUserData(req.query.userId);
    userModels.then((data) => {
      if(data.length == 0){
        res.json({
          success:true,
          message:"user not found",
          data:null
        })
      }else{
        let bidIdData = data[0].bids
        jobHelper.getBidDataUsingId(bidIdData).then((data) => {
          responseData = [];
          let sortedData = data.reverse();
          let startIndex = 0;
          let stopIndex = 0;
          if(req.query.index> sortedData.length){
            startIndex = 0;
            stopIndex =sortedData.length-1;
          }else if(req.query.index<=sortedData.length-1 && Number(req.query.index)+9>sortedData.length-1){
            startIndex = req.query.index;
            stopIndex = sortedData.length-1;
          }else if(Number(req.query.index)+9<=sortedData.length-1){
            startIndex = req.query.index;
            stopIndex = Number(req.query.index) + 9;
          }
          for(let bidJobDataIndex = startIndex;bidJobDataIndex<=stopIndex;bidJobDataIndex++){
            let jobData = sortedData[bidJobDataIndex];
            let jobObj = {};
            jobObj._id = jobData._id;
            jobObj.technologies = jobData.technologies;
            jobObj.title = jobData.title;
            jobObj.tags = jobData.tags;
            jobObj.description = jobData.details;
            jobObj.deadline = jobData.deadline;
            jobObj.price = jobData.price,
            jobObj.status = jobData.status
            responseData.push(jobObj);
          }
  
          res.json({
            success:true,
            message:"Data found",
            data:responseData,
            numberOfPages: Math.floor(sortedData.length/10)
          })
        })
      }
    })
  });

router.get('/getMyPosts',(req,res)=>{
    let userModels = userHelper.getUserData(req.query.userId);
    userModels.then((data) => {
      if(data.length == 0){
        res.json({
          success:true,
          message:"user not found",
          data:null
        })
      }else{
        let postIdData = data[0].posts;
        jobHelper.getPostDataUsingId(postIdData).then((data) => {
          responseData = [];
          let sortedData = data.reverse();
          let startIndex = 0;
          let stopIndex = 0;
          if(req.query.index> sortedData.length){
            startIndex = 0;
            stopIndex =sortedData.length-1;
          }else if(req.query.index<=sortedData.length-1 && Number(req.query.index)+9>sortedData.length-1){
            startIndex = req.query.index;
            stopIndex = sortedData.length-1;
          }else if(Number(req.query.index)+9<=sortedData.length-1){
            startIndex = req.query.index;
            stopIndex = Number(req.query.index) + 9;
          }
          for(let postJobDataIndex = startIndex;postJobDataIndex<=stopIndex;postJobDataIndex++){
            let jobData = sortedData[postJobDataIndex];
            let jobObj = {};
            jobObj._id = jobData._id;
            jobObj.technologies = jobData.technologies;
            jobObj.title = jobData.title;
            jobObj.tags = jobData.tags;
            jobObj.description = jobData.details;
            jobObj.deadline = jobData.deadline;
            jobObj.price = jobData.price,
            jobObj.status = jobData.status
            jobObj.numberOfBids = jobData.numberOfBids
            responseData.push(jobObj);
          }
  
          res.json({
            success:true,
            message:"Data found",
            data:responseData,
            numberOfPages: Math.floor(sortedData.length/10)
          })
        })
      }
    })
  })
  
  module.exports = router;
  