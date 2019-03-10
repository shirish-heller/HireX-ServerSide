const jobModel = require('../models/jobPostModel').jobModel;

let mandatoryFieldsMissing = (requestBody) => {
  let mandatoryFieldsMissingArray = [];

  if(!requestBody.title){
    mandatoryFieldsMissingArray.push('title is missing');
  }

  if(!requestBody.details){
    mandatoryFieldsMissingArray.push('job details is missing');
  }

  if(!requestBody.deadline){
    mandatoryFieldsMissingArray.push('job deadline is missing');
  }

  if(!requestBody.price){
    mandatoryFieldsMissingArray.push('job price is missing');
  }

  if(!requestBody.userId){
    mandatoryFieldsMissingArray.push('user id is missing');
  }

  return mandatoryFieldsMissingArray;
}

let getJobData = (jobId) => {
  let query={
    _id:jobId
  }

  return jobModel.find(query).exec();
}
let getAllJobs = () => {
  return jobModel.find().exec();
}
let getBidDataUsingId = (bidIdArray) => {
  return jobModel.find().where("_id").in(bidIdArray).exec();
}

let getPostDataUsingId = (postIdArray) => {
  return jobModel.find().where("_id").in(postIdArray).exec();
}
module.exports = {
  mandatoryFieldsMissing:function(requestBody){
    return mandatoryFieldsMissing(requestBody)
  },
  getJobData:function(jobId){
    return getJobData(jobId);
  },
  getAllJobs:function(){
    return getAllJobs();
  },
  getBidDataUsingId:function(bidIdArray){
    return getBidDataUsingId(bidIdArray)
  },
  getPostDataUsingId:function(postIdArray){
    return getPostDataUsingId(postIdArray);
  }
}