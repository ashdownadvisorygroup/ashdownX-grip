var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
//var Profil = mongoose.model('Profil');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var mustBe = require("mustbe");
var mustBeConfig = require("../mustbe-config");
//mustBe.configure(mustBeConfig);
var mustbe = require("mustbe").routeHelpers();

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
router.param('user', function (req, res, next, id) {



  var query = User.findById(id);


  query.exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error('can\'t find user'));
    }

    req.user = user;
    return next();
  });
});
router.get('/user/:user',passport.authenticate('jwt', { session: false}), function (req, res) {
  var token = getToken(req.headers);
  console.log(token);

  if (token) {
    var decoded = jwt.decode(token, config.secret);
    console.log(decoded);
    var query = User.findById(decoded._id);


    query.exec(function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error('can\'t find user'));
      }

      user.populate('groups')
          .populate('profil',function (err, user) {
        if (err) {
          return next(err);
        }

        res.json(user);
        console.log(user)
      });

    });

  }
});

router.post('/signup', function (req, res, next) {
  console.log(req.body);
  if (!req.body.name || !req.body.password || !req.body.groups || !req.body.profil) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
      //groups: req.body.groups
    });
    /*newUser.populate('groups', function (err, user) {
      if (err) {
        return next(err);
      }
    });*/
    // save the user
    newUser.save(function(err,newUser) {
      if (err) {
        console.log(err)
        return res.json({success: false, msg: 'Username already exists.'});
      }
      newUser.groups.push.apply(newUser.groups, req.body.groups)
      newUser.profil.push.apply(newUser.profil, req.body.profil)
      //Array.prototype.push.apply(newUser.groups,req.body.groups)

      newUser.save();
      console.log(newUser + " sauvegardé")
      res.json(newUser)
    /*  req.groups.users.push(us);
      req.groups.save(function (err, groups) {
        if (err) {
          return next(err);
        }

        //res.json({success: true, msg: 'Successful created new user.'});
        res.json(us);
      });*/

      //res.json(us);
    });
  }});//post users
/*router.get('/user/:user',passport.authenticate('jwt', { session: false}), function (req, res) {

  var token = getToken(req.headers);
  console.log(req.user);
  if (token) {
    req.user
        .populate('roles')
        .populate('groups')
        .exec(function (err, user){
      if (err) {
        return next(err);
      }

      res.json(user);
    });
  }

});*/
router.put('/user',passport.authenticate('jwt', { session: false}), function (req, res,next) {//pour le stagiaire
  var token = getToken(req.headers);
  if (token) {
    console.log(token)
    var decoded = jwt.decode(token, config.secret);
    console.log(decoded);
    //console.log(decoded.user)

    var query = User.findById(decoded._id);


    query.exec(function (err, usr) {
      if (err) {
        return next(err);
      }
      if (!usr) {
        return next(new Error('can\'t find user'));
      }


      usr.name = req.body.name;
      usr.password = req.body.password;
      //usr.groups=req.body.groups;
      //console.log(usr.groups)
      usr.save(function (err, usr) {
        if (err) {
          console.log(err);
          return next(new Error('can\'t save user'));
        }
        users={};
        users=usr;
        users.success=true;
        res.json(users);
      });
    });
    }
});
/*router.put('/users/:user',passport.authenticate('jwt', { session: false}), function (req, res) {//pour l'admin
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    console.log(decoded);
    console.log(decoded.user)
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
})*/
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
router.post('/authenticate', function (req, res) {//login
  User.findOne({
    name: req.body.name,
    //groups: req.body.groups
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

          //res.cookie("usercookie", req.body.name);
          //res.cookie("usercookie").usercookie = req.body.name;

          user.populate('groups')
              .populate('profil', function (err, user) {
            if (err) {
              return next(err);
            }
            req.session.user = user;
            console.log(req.session.user);
            var users={success:"",name:"",permissions:[],token:"",id:"",profilActuel:[],profils:[],groups:[]};
            users.success=true;
            users.name=user.name;
            console.log(user.groups.length)
            for (var i = 0, len = user.groups.length; i < len; i++) {
              console.log(user.groups[i].nom)
              users.permissions[i]=user.groups[i].nom;//pour les permissins
            }
            for (var i = 0, len = user.profil.length; i < len; i++) {
              //console.log(user.groups[i].nom)
              users.profilActuel[i]=user.profil[i].nom;//pour les permissins
            }
            users.token='JWT ' + token;
            users.id=user._id;

            console.log(users)

            res.json(users);
          });

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
