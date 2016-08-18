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
var MediaProfil = mongoose.model('MediaProfil');
//var Profil = mongoose.model('Profil');


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
//var mustbe = require("mustbe").activities();
var mustBeConfig = require("../mustbe-config");
mustBe.configure(mustBeConfig);
mustBe= mustBe.routeHelpers();
const addSeed = require('mongoose-plugin-seed').addSeed;
const mongooseSeed = require('mongoose-plugin-seed').seed;
var Group = mongoose.model('Group');


router.param('media_profil', function (req, res, next, id) {
    // console.log(id)

    //console.log(req);


    if (id == undefined) {
        return next(new Error('media_profil undifined'));
    }
    var query = MediaProfil.findById(id)

    query.exec(function (err, media_profil) {
        if (err) {
            return next(err);
        }
        if (!media_profil) {
            return res.json("error lor de la sauvegarde");
            return next(new Error('can\'t find media_profil'));
        }
        console.log(media_profil);

        req.media_profil = new MediaProfil(media_profil);
        return next();
    });


});

router.get('/media_profils',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        /*var decoded = jwt.decode(token, config.secret);
         var ids=decoded._id;
         console.log(decoded);*/
        MediaProfil.find(function (err, media_profils) {
            if (err) {
                return next(err);
            }

            res.json(media_profils);
        });
    }

});

router.get('/media_profil/:media_profil',passport.authenticate('jwt', { session: false}), function (req, res) {

    var token = getToken(req.headers);
    //console.log(req.media_profil);
    if (token) {
        req.media_profil.populate('profil')
            .populate('media', function (err, media_profil) {
            if (err) {
                return next(err);
            }

            res.json(media_profil);
        });
        //res.json(req.media_profil);
    }

});

router.post('/media_profils',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        req.checkBody('rang', 'Veuillez renseigne les nom').notEmpty();
        req.checkBody('rang', 'Veuillez ajouter des caractere aux nom').len(1, 3);

        var errors = req.validationErrors();
        if (errors) {
            res.json(errors, 422);
            return;
        }
        var prf_md = new MediaProfil(req.body);
        prf_md.save(function (err, prf_md) {
            if (err) {
                return next(err);
            }

            res.json(prf_md);
        });
    }

});

router.put('/media_profil/:media_profil',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        prf_md = req.media_profil;
        prf_md.rang = req.body.rang;
        prf_md.save(function (err, prf_md) {
            if (err) {
                return next(err);
            }

            res.json(prf_md);
        });
    }

});
router.delete('/media_profil/:media_profil',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        MediaProfil.remove({
            _id: req.media_profil._id
        }, function(err, media_profil) {
            if (err)res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    }

});
module.exports = router;