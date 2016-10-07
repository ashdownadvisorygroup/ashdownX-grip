/**
 * Created by NOUBISSI TAPAH PHOEB on 26/09/2016.
 */

var express = require('express');

var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var User = mongoose.model('User');
var Profil = mongoose.model('Profil');
var passport = require('passport');
var jwt = require('jwt-simple');
var Media = mongoose.model('Media');
var util = require('util');
var async = require('async');



/*router.get("/:id", mustBe.authorized("view thing"), view);

 function view(req, res, next){
 res.render("/something");
 }*/


router.get('/search', function (req, res) {

    var word = req.query.word;
   // var token = getToken(req.headers);
    //console.log(req.group);
   /* if (token) {

    }*/

    var result={};
    var nom = 'nom';
    var query={};
    query[nom]=word;
    Group.find({"nom":req.query.word}).exec(function(err,groups){
        console.log(groups)
        result.groups=groups;
        res.json(groups);
    })

    async.waterfall([
        function(done) {

            User.find({"name": '/.*'+word+'.*/'},function(err,users){
                result.users=users;
                done(err, users);
            })

        },
        function(users,done) {
            var nom = 'nom';
            var query={};
            query[nom]=word;
            Group.find({ "$or": [
               query
            ]},function(err,groups){
                console.log(groups)
                result.groups=groups;
                done(err, groups);
            })
        },
        function(groups,done) {

            Profil.find({"nom": '/.*'+word+'.*/'},function(err,profils){
                result.profils=profils;
                done(err, profils);
            })


        },

        function( users,groups,profils, done) {

            res.json(result);
        }
    ], function(err) {
        console.log(err);
        if (err) return next(err);
        res.redirect('/forgot');
    });

});

module.exports = router;