var express = require('express');
session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
//var expressValidator = require('express-validator');
var util = require('util');
var expressValidator = require('express-validator');
var app = express();
var oembed=require("oembed-auto");
var jwt = require('jwt-simple');
//connection a la bd
var mongoose = require('mongoose');
require('./config/passport')(passport);
require('./models/Categories');
require('./models/Livres');
require('./models/users');
mongoose.connect('mongodb://127.0.0.1/bv');

var routes = require('./routes/index');
var users = require('./routes/users');
var categories = require('./routes/categories');
var livres = require('./routes/livres');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressValidator);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use('/', routes);
app.use('/', categories);
app.use('/', livres);
app.use('/', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
