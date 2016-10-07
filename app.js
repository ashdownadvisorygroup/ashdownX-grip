var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var async = require('async');
var crypto = require('crypto');
//var expressValidator = require('e
// xpress-validator');
var util = require('util');
var expressValidator = require('express-validator');
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var app = express();
var oembed=require("oembed-auto");
var jwt = require('jwt-simple');
var flash = require('express-flash');

//connection a la bd
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/bv');
require('./config/passport')(passport);
require('./models/index');
//require('./models/profil');



var routes = require('./routes/index');
var users = require('./routes/users');
var Medias = require('./routes/medias');
var categories = require('./routes/categories');
var groups = require('./routes/groups');

var categorie_medias = require('./routes/categorie_medias');
var profil_medias = require('./routes/profil_categories');
var users_medias = require('./routes/users_medias');
var profil = require('./routes/profil');
var user_profils = require('./routes/user_profils');
var search = require('./routes/search');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(expressValidator);
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


//mustbe setup
var mustBe = require("mustbe");
var mustBeConfig = require("./mustbe-config");
mustBe.configure(mustBeConfig);

app.use('/', routes);
app.use('/', Medias);
app.use('/', categories);
app.use('/', users);
app.use('/', groups);
app.use('/', profil_medias);
app.use('/', categorie_medias);
app.use('/', users_medias);
app.use('/', profil);
app.use('/', user_profils);
app.use('/', search);








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
