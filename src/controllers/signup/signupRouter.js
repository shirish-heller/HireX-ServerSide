const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const userModel = require('../../models/userModel').userModel;
const signUpHelper = require('../../middlewares/signupHelper.middleware');

router.use(bodyParser.json());

router.post('/',(req,res) => {
  let model = userModel({
    "firstName":req.body.firstName,
    "lastName":req.body.lastName,
    "username":req.body.username,
    "password":req.body.password,
    "email":req.body.email,
    "role":req.body.role,
    "wallet":0
  });

  let generateHashedPasswordsPromise = signUpHelper.generateHashedPassword(req.body.password);
  generateHashedPasswordsPromise
  .then((data) => {
    model.password = data;
    return signUpHelper.checkDuplicateRecords(req.body.email);
  })
  .then(function(data){
    if(data.length == 0){
      model.save(function(err,data){
        if(err){
          throw err;
        }else{
          res.json({
            "success":true,
            "message":{
              "data":"User successfully signed up"
            }
          })
        }
      })
    }else{
      res.json({
        "success":false,
        "message":{
          "data":"User already exists"
        }
      })
    }
  })
})

module.exports = router;
