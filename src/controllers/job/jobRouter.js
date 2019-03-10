const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const jobHelper = require('../../middlewares/jobHelper.middleware');
const jobModel = require('../../models/jobPostModel').jobModel;
const userHelper = require('../../middlewares/userHelper.middleware');

router.use(bodyParser.json());

router.get('/getJob',(req,res) => {
  let jobData = jobHelper.getJobData(req.body.id);
  jobData
  .then(function(data){
    if(data.length == 0){
      res.json({
        success:true,
        message:"Job not found",
        data:null
      })
    }else{
      let jobData = data[0];
      res.json({
        success:true,
        message:"Job found successsfully",
        data:jobData
      })
    }
  })
});

router.post('/createJob',(req,res) => {
  let newJobModel;
  //Check for valid user Id
  let userModels = userHelper.getUserData(req.body.userId);
  userModels.then(function(data){
    if(data.length == 0){
      res.json({
        success:false,
        message:"Invalid user Id"
      })
    }else{
      //Check for mandatory missing fields
      let mandatoryFieldsMissing = jobHelper.mandatoryFieldsMissing(req.body);
      if(mandatoryFieldsMissing.length>0){
        res.json({
          success:false,
          message:"Please fill up the mandatory missing data",
          data:mandatoryFieldsMissing
        })
      }else{
        let model = jobModel({
          "title":req.body.title,
          "details":req.body.details,
          "deadline":new Date(req.body.deadline),
          "technologies":req.body.technologies,
          "price":req.body.price,
          "status":"Active",
          "tags":req.body.tags,
          "userId":req.body.userId
        });

        //save the model to db
        model.save().then((data) =>{
          newPostModel = data;
          return userHelper.getUserData(req.body.userId);
        }).then((data) =>{
          let usermodel = data[0];
          usermodel.posts.push(newPostModel._id)
          return usermodel.save();
        }).then((data) => {
          res.json({
            "success":true,
            "message":"Job Successfully created",
            "data":newPostModel
          })
        })
      }
    }
  })
});

router.put('/updateJob',(req,res) => {
  let jobModel = jobHelper.getJobData(req.body.id);
  jobModel.then((data) => {
    if(data.length == 0){
      res.json({
        success:true,
        message:"Job not found",
        data:null
      })
    }else{
      let jobData = data[0];
      jobData.title = req.body.title ? req.body.title : jobData.title;
      jobData.details = req.body.details ? req.body.details : jobData.details;
      jobData.deadline = req.body.deadline ? req.body.deadline : jobData.deadline;
      jobData.technologies = req.body.technologies ? req.body.technologies : jobData.technologies;
      jobData.price = req.body.price ? req.body.price : jobData.price;
      jobData.status = req.body.status ? req.body.status : jobData.status;
      jobData.tags = req.body.tags ? req.body.tags : jobData.tags;
  
      jobData.save(function(err,data){
        if(err){
          throw err;
        }else{
          res.json({
            "success":true,
            "message":"Job successfully update",
            "data":data
          })
        }
      })
    }
  })
})

router.delete('/deleteJob',(req,res) => {
  let jobData = jobHelper.getJobData(req.body.id);
  jobData
  .then(function(data){
    if(data.length == 0){
      res.json({
        success:true,
        message:"Job not found",
        data:null
      })
    }else{
      let jobData = data[0];
      jobData.delete(function(err,data){
        if(err){
          throw err;
        }else{
          res.json({
            success:true,
            message:"Job deleted successsfully",
            data:null
          })
        }
      })
    }
  })
})
router.get('/getAllJobs',(req,res) => {
  let allJobsData = jobHelper.getAllJobs()
  allJobsData.then((data) => {
    let responseData = [];
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
    for(let dataIndex = startIndex;dataIndex<=stopIndex;dataIndex++){
      let jobData = sortedData[dataIndex];
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
      message:"All Jobs found",
      numberOfPages:Math.floor(sortedData.length/10)+1,
      data:responseData
    })
  })
})
module.exports  = router;