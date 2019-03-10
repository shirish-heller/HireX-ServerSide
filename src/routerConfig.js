const signUpRouter = require('./controllers/signup/signupRouter');
const loginRouter = require('./controllers/login/loginRouter');
const userRouter = require('./controllers/user/userRouter');
const jobRouter = require('./controllers/job/jobRouter');
const bidRouter = require('./controllers/bid/bidRouter');

const mount = (app)=> {
    app.use('/signup',signUpRouter),
    app.use('/auth',loginRouter),
    app.use('/user',userRouter),
    app.use('/job',jobRouter),
    app.use('/bid',bidRouter)
}

module.exports = {
    mount
  }