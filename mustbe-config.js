/**
 * Created by NOUBISSI TAPAH PHOEB on 12/08/2016.
 */
// ./mustbe-config.js
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('./config/database');
var mustBe = require("mustbe");
var group = require("./models/Groups");
require("./routes/users");
var User = mongoose.model('User');
module.exports = function(config){

    config.routeHelpers(function(rh){
        // get the current user from the request object
        rh.getUser(function(req, cb){
            var token = getToken(req.headers);
            // return cb(err); if there is an error
            // if user is found and password is right create a token
            if(token){
                var decoded = jwt.decode(token,'devdacticIsAwesome');
                cb(null, decoded);
            }

            /*var token1 = req.headers['authorization'] || req.cookies.user.token;
            var decoded = jwt.decode(req.headers['authorization'],'devdacticIsAwesome');*/




        });
        // what do we do when the user is not authorized?
        rh.notAuthorized(function(req, res, next){
            res.json("notAuthorized");
        });
    });
    config.activities(function(activities){

        activities.can("admin", function(identity, params, cb){
            // now check if you're an admin. this may involve database
            // calls or other service calls.
            var user = identity.user;
            var isAdmin = false;
            for (var i = 0;  i < user.groups.length; i++) {
                isAdmin = (user.groups[i].nom == "admin");
            }
            cb(null, isAdmin);
        });
        activities.can("stagiaire", function(identity, params, cb){
            // now check if you're an admin. this may involve database
            // calls or other service calls.
            var user = identity.user;
            var isStagiaire;
            for (var i = 0, len = user.groups.length; i < len; i++) {
                isStagiaire = (user.groups[i].nom=="stagiaire");
            }

            cb(null, isStagiaire);
        });
       /* activities.can("master", function(identity, params, cb){
            // now check if you're an admin. this may involve database
            // calls or other service calls.
            var user = identity.user;
            var isMaster;
            for (var i = 0, len = user.groups.length; i < len; i++) {
                isMaster = (user.groups[i].nom=="master");
            }

            cb(null, isMaster);
        })*/;
    });

};



