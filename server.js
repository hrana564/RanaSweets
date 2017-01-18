var PORT = 8000 || process.env.PORT;
var mainRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var loginRouter=require('./routes/login');
var signupRouter=require('./routes/signup');
var homeRouter=require('./routes/home');
var resetPasswordRouter = require('./routes/resetpassword');
var forgotPasswordRouter = require('./routes/forgotpassword');
var DB = "mongodb://hrana564:Login123@ds141428.mlab.com:41428/ranasweets";
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
mongoose.Promise = require('bluebird');

var config = require('./utilities/config.js');
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', mainRouter);
app.use('/api', apiRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);
app.use('/forgotPassword',forgotPasswordRouter);
app.use('/resetPassword',resetPasswordRouter);
app.use('/home',homeRouter);
mongoose.connect(config.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("connected to mongoDB");
    }
});
app.set('views', __dirname + '\\client\\views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'client')));


app.listen(PORT, function() {
    console.log('Listening on port ' + PORT);
});