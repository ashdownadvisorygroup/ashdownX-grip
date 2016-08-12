var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');

/* GET users listing. */
router.get('/users',passport.authenticate('jwt', { session: false}), function (req, res, next) {
  var token = getToken(req.headers);
  if (token) {

    User.find(function (err, users) {
      if (err) {
        return next(err);
      }

      res.json(users);
    });
  }

});
router.param('user',passport.authenticate('jwt', { session: false}), function (req, res, next, id) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    var ids=decoded._id;

  var query = User.findById(ids);

  query.exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('can\'t find user'));
    }

    req.user = user;
    return next();
  }); }
});
router.get('/user/:user',passport.authenticate('jwt', { session: false}), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
  res.json(req.user);}
});

router.post('/signup', function (req, res, next) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err,us) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
      //res.json(us);
    });
  }
});//post users
router.put('/user/:user',passport.authenticate('jwt', { session: false}), function (req, res) {//pour le stagiaire
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    console.log(decoded);
    //console.log(decoded.user)
    usr = req.user;
    usr.name = req.body.name;
    usr.password = req.body.password;
    usr.save(function (err, usr) {
      if (err) {
        return next(err);
      }
      token = jwt.encode(usr, config.secret);
      console.log(jwt.decode(token, config.secret));
      res.json(usr);
    });}
});
router.put('/users/:user',passport.authenticate('jwt', { session: false}), function (req, res) {//pour l'admin
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    console.log(decoded);
    console.log(decoded.user)
  usr = req.user;
  usr.name = req.body.name;
  usr.password = req.body.password;
  usr.accessLevel=req.body.accessLevel;
  usr.activate=req.body.activate;
  usr.save(function (err, usr) {
    if (err) {
      return next(err);
    }
    token = jwt.encode(usr, config.secret);
    console.log(jwt.decode(token, config.secret));
    res.json(usr);
  });}
});
router.post('/authenticate', function (req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          req.session.user = user;

          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});


router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    console.log(decoded.name);
    console.log(decoded.password);
    console.log(decoded._id);
    console.log(token);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
