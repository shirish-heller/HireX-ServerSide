const userModel = require('../models/userModel').userModel;

let getUserData = (userId) => {
  let query={
    _id:userId
  }
  return userModel.find(query).exec();
}
module.exports = {
  getUserData:function(userId){
    return getUserData(userId);
  }
}