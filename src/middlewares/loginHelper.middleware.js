const userModel = require('../models/userModel').userModel;
const jwt = require("jsonwebtoken");

let getUserModels = (userEmail) => {
  let query={
    email:userEmail
  }
  return userModel.find(query).exec();
}

let getJWT = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET,{ 
    algorithm: 'HS256',
    expiresIn:'48h'
  });
}

module.exports = {
  getUserModels: function(userEmail){
    return getUserModels(userEmail);
  },
  getJWT: function(data){
    return getJWT(data);
  }
}