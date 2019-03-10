const userModel = require('../models/userModel').userModel;
const bcrypt = require('bcrypt');

let checkDuplicateRecords = (signupEmail) => {
  let query = {
    email: signupEmail
  };

  return userModel.find(query).exec();
}

let generateHashedPassword = (password) => {
  return bcrypt.hash(password,10);
}

module.exports = {
  checkDuplicateRecords: function(signupEmail){
    return checkDuplicateRecords(signupEmail);
  },
  generateHashedPassword: function(password){
    return generateHashedPassword(password);
  }
}