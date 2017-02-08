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
var CategorieProfil = mongoose.model('CategorieProfil');
var Profil = mongoose.model('Profil');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var Categorie = mongoose.model('Categorie');
var ProfilCatUser = mongoose.model('ProfilCatUser');
var CategorieMedia = mongoose.model('CategorieMedia');
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


router.param('categorie_profil', function (req, res, next, id) {
    if (id == undefined) {
        return next(new Error('categorie_profil undifined'));
    }
    var query = CategorieProfil.findById(id)
    query.exec(function (err, categorie_profil) {
        if (err) {
            return next(err);
        }
        if (!categorie_profil) {
            return res.json("error lor de la sauvegarde");
            return next(new Error('can\'t find categorie_profil'));
        }
        req.categorie_profil = new CategorieProfil(categorie_profil);
        return next();
    });
});
/*mustBe.authorized("admin")/!**!/*/
/**
*       retourne les profils et le catégories d'un utilisateur et de son master
 *   mais les données sont brutes et un traitement de groupeby est fait en front
* */
router.post('/categorie_profils/user_master',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        CategorieProfil.find()
            .where('profil').in(req.body.ofuser)
            .populate('categorie')
            .populate('profil')
            .exec(function (erruser, ofuser) {
            if (erruser) {
                return next(erruser);
            }
                var list=[];
                ofuser.forEach(function(dat) {
                    if(dat.categorie){
                        if(list.indexOf(dat.categorie._id) == -1){
                            list.push(dat.categorie._id);
                        }
                    }

               });
                var v=[];
                CategorieMedia.find()
                    .populate('media')
                    .exec(function (errmed, ofmed){
                        if (errmed) {
                            return next(errmed);
                        }
                        for(var i = 0; i<ofmed.length; i++) {

                            if(list.indexOf(ofmed[i].categorie) == -1){
                                if(ofmed[i].media){v.push(ofmed[i])}

                            }

                        }
                        res.json({ofuser:ofuser, ofmed: v});
                    });
            });
    }

});
router.get('/users/:user/:profil/:categorie/user_profil_categorie',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        ProfilCatUser.find({user:req.params.user,profil:req.params.profil,categorie:req.params.categorie},
            function (err, categorie_profil_user) {
            if (err) {
                return next(err);
            }
            res.json(categorie_profil_user);
        });
    }

});

router.get('/categorie_profil/:categorie_profil',passport.authenticate('jwt', { session: false}), function (req, res) {

    var token = getToken(req.headers);
    if (token) {
        req.categorie_profil.populate('profil')
            .populate('categorie', function (err, categorie_profil) {
            if (err) {
                return next(err);
            }

            res.json(categorie_profil);
        });
    }

});


router.post('/categorie_profils',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        req.checkBody('rang', 'Veuillez renseigne les nom').notEmpty();
        req.checkBody('rang', 'Veuillez ajouter des caractere aux nom').len(1, 3);

        var errors = req.validationErrors();
        if (errors) {
            res.json(errors, 422);
            return;
        }
        var prf_md = new CategorieProfil(req.body);
        prf_md.save(function (err, prf_md) {
            if (err) {
                return next(err);
            }

            res.json(prf_md);
        });
    }

});

router.put('/categorie_profil/:categorie_profil',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        prf_md = req.categorie_profil;
        prf_md.rang = req.body.rang;
        prf_md.save(function (err, prf_md) {
            if (err) {
                return next(err);
            }

            res.json(prf_md);
        });
    }

});
router.delete('/categorie_profil/:categorie_profil',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        CategorieProfil.remove({
            _id: req.categorie_profil._id
        }, function(err) {
            if (err)res.send(err);

            res.json({ message: 'Successfully deleted' });
        });

    }

});
module.exports = router;