const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const loginHelper = require('../../middlewares/loginHelper.middleware');
const bcrypt = require('bcrypt');


router.use(bodyParser.json());

router.post('/login',(req,res) => {
  let userModels = loginHelper.getUserModels(req.body.email);
  let userData = [];
  userModels
  .then(function(data){
    if(data.length == 0){
      res.json({
        success:false,
        message:"Invalid Email id or password"
      })
    }
    userData = data[0];
    return bcrypt.compare(req.body.password, data[0].password);
  })
  .then(function(data){
    if(data){
      let token = loginHelper.getJWT({username:req.body.email});
      res.json({
        success:true,
        token:token,
        userData:{
          firstName:userData.firstName,
          lastName:userData.lastName,
          username:userData.username,
          email:userData.email,
          userId:userData._id
        }
      })
    }else{
      res.json({
        success:false,
        message:"Please try again!!"
      });
    }
  })
})

module.exports = router