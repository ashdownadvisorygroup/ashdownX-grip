/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
expressValidator = require('express-validator');
var util = require('util');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var MediaUser = mongoose.model('MediaUser');
//var Profil = mongoose.model('Profil');
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


router.param('media_user', function (req, res, next, id) {
    // console.log(id)

    //console.log(req);


    if (id == undefined) {
        return next(new Error('media_user undifined'));
    }
    var query = MediaUser.findById(id)

    query.exec(function (err, media_user) {
        if (err) {
            return next(err);
        }
        if (!media_user) {
            return res.json("error lor de la sauvegarde");
            return next(new Error('can\'t find media_user'));
        }
        console.log(media_user);

        req.media_user = new MediaUser(media_user);
        return next();
    });


});

router.get('/media_users',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        /*var decoded = jwt.decode(token, config.secret);
         var ids=decoded._id;
         console.log(decoded);*/
        MediaUser.find(function (err, media_users) {
            if (err) {
                return next(err);
            }

            res.json(media_users);
        });
    }

});

router.get('/media_user/:media_user',passport.authenticate('jwt', { session: false}), function (req, res) {

    var token = getToken(req.headers);
    //console.log(req.media_user);
    if (token) {
        req.media_user.populate('user')
            .populate('media', function (err, media_user) {
            if (err) {
                return next(err);
            }

            res.json(media_user);
        });
        //res.json(req.media_user);
    }

});

router.post('/media_users',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        req.checkBody('progression', 'Veuillez renseigne les nom').notEmpty();
        req.checkBody('progression', 'Veuillez ajouter des caractere aux nom').len(3, 20);

        var errors = req.validationErrors();
        if (errors) {
            res.json(errors, 422);
            return;
        }
        var md_usr = new MediaUser(req.body);
        md_usr.save(function (err, md_usr) {
            if (err) {
                return next(err);
            }

            res.json(md_usr);
        });
    }

});

router.put('/media_user/:media_user',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        md_usr = req.media_user;
        md_usr.progression = req.body.progression;
        md_usr.save(function (err, md_usr) {
            if (err) {
                return next(err);
            }

            res.json(md_usr);
        });
    }

});
router.delete('/media_user/:media_user',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        MediaUser.remove({
            _id: req.media_user._id
        }, function(err, media_user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    }

});
module.exports = router;