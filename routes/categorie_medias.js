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
var CategorieMedia = mongoose.model('CategorieMedia');
var Profil = mongoose.model('Profil');
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


router.param('categorie_medias', function (req, res, next, id) {
    // console.log(id)

    //console.log(req);


    if (id == undefined) {
        return next(new Error('categorie_medias undifined'));
    }
    var query = CategorieMedia.findById(id)

    query.exec(function (err, categorie_medias) {
        if (err) {
            return next(err);
        }
        if (!categorie_medias) {
            return res.json("error lor de la sauvegarde");
            return next(new Error('can\'t find categorie_medias'));
        }
        console.log(categorie_medias);

        req.categorie_medias = new CategorieMedia(categorie_medias);
        return next();
    });


});
/*mustBe.authorized("admin")/!**!/*/

router.get('/categorie_medias',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        CategorieMedia.find(function (err, categorie_medias) {
            if (err) {
                return next(err);
            }

            res.json(categorie_medias);
        });
    }

});

router.get('/categorie_medias/:categorie_medias',passport.authenticate('jwt', { session: false}), function (req, res) {

    var token = getToken(req.headers);
    if (token) {
        req.categorie_medias.populate('media')
            .populate('categorie', function (err, categorie_medias) {
                if (err) {
                    return next(err);
                }

                res.json(categorie_medias);
            });
        //res.json(req.categorie_medias);
    }

});


router.post('/categorie_medias',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        req.checkBody('rang', 'Veuillez renseigne les nom').notEmpty();
        req.checkBody('rang', 'Veuillez ajouter des caractere aux nom').len(1, 3);

        var errors = req.validationErrors();
        if (errors) {
            res.json(errors, 422);
            return;
        }
        var cat_md = new CategorieMedia(req.body);
        cat_md.save(function (err, cat_md) {
            if (err) {
                return next(err);
            }

            res.json(cat_md);
        });
    }

});

router.put('/categorie_medias/:categorie_medias',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        cat_md = req.categorie_medias;
        cat_md.rang = req.body.rang;
        cat_md.save(function (err, cat_md) {
            if (err) {
                return next(err);
            }

            res.json(cat_md);
        });
    }

});
router.delete('/categorie_medias/:categorie_medias',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        CategorieMedia.remove({
            _id: req.categorie_medias._id
        }, function(err) {
            if (err)res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    }

});
module.exports = router;/**
 * Created by NOUBISSI TAPAH PHOEB on 02/09/2016.
 */
