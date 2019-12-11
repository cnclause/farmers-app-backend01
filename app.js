var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()

const { checkAuthHeaderSetUser, checkAuthHeaderSetUserUnAuthorized, notFound, errorHandler } = require('./middlewares/index')

const user = require('./api/users')
const auth = require('./auth/index')
const weather = require('./api/weather')
const topics = require('./api/topics')
const comments = require('./api/comments')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(passport.initialize())
app.use(checkAuthHeaderSetUser)

app.get('/', (req, res) => {
  res.json({
    message: "we are home"
  })
})

app.use('/auth', auth)
app.use('/user', user)
app.use('/weather', weather)
app.use('/topics', topics)
app.use('/comments', comments)




// middleware errors
app.use(notFound)
app.use(errorHandler)




module.exports = app;
