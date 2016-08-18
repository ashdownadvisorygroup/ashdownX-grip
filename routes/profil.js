/**
 * Created by NOUBISSI TAPAH PHOEB on 16/08/2016.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
expressValidator = require('express-validator');
var util = require('util');
var mongoose = require('mongoose');
var User = mongoose.model('User');
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


router.param('profil', function (req, res, next, id) {
    // console.log(id)

    //console.log(req);


    if (id == undefined) {
        return next(new Error('profil undifined'));
    }
    var query = Profil.findById(id)

    query.exec(function (err, profil) {
        if (err) {
            return next(err);
        }
        if (!profil) {
            return res.json("error lor de la sauvegarde");
            return next(new Error('can\'t find profil'));
        }
        console.log(profil);

        req.profil = new Profil(profil);
        return next();
    });


});

router.get('/profils',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        /*var decoded = jwt.decode(token, config.secret);
         var ids=decoded._id;
         console.log(decoded);*/
        Profil.find(function (err, profils) {
            if (err) {
                return next(err);
            }

            res.json(profils);
        });
    }

});

router.get('/profil/:profil',passport.authenticate('jwt', { session: false}), function (req, res) {

    var token = getToken(req.headers);
    //console.log(req.profil);
    if (token) {
        req.profil.populate('users', function (err, profil) {
            if (err) {
                return next(err);
            }

            res.json(profil);
        });
        //res.json(req.profil);
    }

});

router.post('/profils',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        req.checkBody('nom', 'Veuillez renseigne les nom').notEmpty();
        req.checkBody('nom', 'Veuillez ajouter des caractere aux nom').len(3, 20);

        var errors = req.validationErrors();
        if (errors) {
            res.json(errors, 422);
            return;
        }
        var prf = new Profil(req.body);
        prf.save(function (err, prf) {
            if (err) {
                return next(err);
            }

            res.json(prf);
        });
    }

});

router.put('/profil/:profil',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        prf = req.profil;
        prf.nom = req.body.nom;
        prf.description = req.body.description;
        prf.objectifs = req.body.objectifs;
        prf.save(function (err, prf) {
            if (err) {
                return next(err);
            }

            res.json(prf);
        });
    }

});
router.delete('/profil/:profil',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        Profil.remove({
            _id: req.profil._id
        }, function(err, profil) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    }

});
module.exports = router;