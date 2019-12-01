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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(passport.initialize())
app.use(checkAuthHeaderSetUser)

app.get('/', checkAuthHeaderSetUserUnAuthorized, (req, res) => {
  res.json({
    message: "we are home"
  })
})

app.use('/auth', auth)
app.use('/user', user)
app.use('/weather', weather)




// middleware errors
app.use(notFound)
app.use(errorHandler)




module.exports = app;
