/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
expressValidator = require('express-validator');
var util = require('util');
var mongoose = require('mongoose');
var UserProfil = mongoose.model('UserProfil');
var Profil = mongoose.model('Profil');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var Categorie = mongoose.model('Categorie');
var Media = mongoose.model('Media');
var path = require('path');
var mime = require('mime');
var fs = require('fs');
var oembed=require("oembed-auto");
var mustBe = require("mustbe");
var mustBeConfig = require("../mustbe-config");
mustBe.configure(mustBeConfig);
mustBe= mustBe.routeHelpers();
const addSeed = require('mongoose-plugin-seed').addSeed;
const mongooseSeed = require('mongoose-plugin-seed').seed;
var Group = mongoose.model('Group');


router.param('user_profil', function (req, res, next, id) {
     if (id == undefined) {
        return next(new Error('user_profil undifined'));
    }
    var query = UserProfil.findById(id)

    query.exec(function (err, user_profil) {
        if (err) {
            return next(err);
        }
        if (!user_profil) {
            return res.json("error lor de la sauvegarde");
            return next(new Error('can\'t find user_profil'));
        }
        console.log(user_profil);

        req.user_profil = new UserProfil(user_profil);
        return next();
    });


});

router.get('/user_profils',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        UserProfil.find(function (err, user_profils) {
            if (err) {
                return next(err);
            }

            res.json(user_profils);
        });
    }

});

router.get('/user_profil/:user_profil',passport.authenticate('jwt', { session: false}), function (req, res) {

    var token = getToken(req.headers);
    //console.log(req.user_profil);
    if (token) {
        req.user_profil.populate('user')
            .populate('profil', function (err, user_profil) {
                if (err) {
                    return next(err);
                }

                res.json(user_profil);
            });
    }

});

router.post('/user_profils',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {

        var md_usr = new UserProfil(req.body);
        md_usr.save(function (err, md_usr) {
            if (err) {
                return next(err);
            }

            res.json(md_usr);
        });
    }

});

router.put('/user_profil/:user_profil',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        md_usr = req.user_profil;
        md_usr.progression = req.body.progression;
        md_usr.save(function (err, md_usr) {
            if (err) {
                return next(err);
            }

            res.json(md_usr);
        });
    }

});
router.delete('/user_profil/:user_profil',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        UserProfil.remove({
            _id: req.user_profil._id
        }, function(err, user_profil) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    }

});
module.exports = router;