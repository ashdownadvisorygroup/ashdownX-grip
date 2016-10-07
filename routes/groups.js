/**
 * Created by NOUBISSI TAPAH PHOEB on 12/08/2016.
 */
var express = require('express');

var app = express();
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var Group = mongoose.model('Group');
var User = mongoose.model('User');
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var Media = mongoose.model('Media');
var util = require('util');
var fs = require('fs');
var mustBe = require("mustbe");
var mustBeConfig = require("../mustbe-config");
mustBe.configure(mustBeConfig);
var mustbe = require("mustbe").routeHelpers();


router.param('group', function (req, res, next, id) {
    if (id == undefined) {
            return next(new Error('group undifined'));
        }
        var query = Group.findById(id)

        query.exec(function (err, group) {
            if (err) {
                return next(err);
            }
            if (!group) {
                return res.json("error lor de la sauvegarde");
                return next(new Error('can\'t find group'));
            }
            console.log(group);

            req.group = new Group(group);
            return next();
        });


});

router.get('/groups',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        /*var decoded = jwt.decode(token, config.secret);
         var ids=decoded._id;
         console.log(decoded);*/
        Group.find().where('nom').ne('superadmin').exec(function (err, groups) {
            if (err) {
                return next(err);
            }

            res.json(groups);
        });
    }

});

router.get('/group/:group',passport.authenticate('jwt', { session: false}), function (req, res) {

    var token = getToken(req.headers);
    if (token) {
        User.find({groups:req.params.group}).exec(function (err, groupe) {//on cherche les utilisateurs qui sont du groupe passé en paramètre
            if (err) {
                return next(err);
            }
            req.group.users=groupe;
            res.json(req.group);
        });

    }

});

router.post('/groups',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        req.checkBody('nom', 'Veuillez renseigne les nom').notEmpty();
        req.checkBody('nom', 'Veuillez ajouter des caractere aux nom').len(3, 20);

        var errors = req.validationErrors();
        if (errors) {
            res.json(errors, 422);
            return;
        }
        var grp = new Group(req.body);
        grp.save(function (err, grp) {
            if (err) {
                return next(err);
            }

            res.json(grp);
        });
    }

});

router.put('/group/:group',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        /*grp = req.group;
        grp.nom = req.body.nom;
        grp.description = req.body.description;
        grp.save(function (err, grp) {
            if (err) {
                return next(err);
            }
            res.json(grp);
        });*/
        var obj=req.body;
        Group.findByIdAndUpdate(req.params.group,{$set: obj},function(err,grp) {
            if (err) {
                return next(err);
            }
            if(!grp) {
                return next(new Error('can\'t find user'));
            }
            console.log(grp)
            res.json('updated');
        });
    }

});
module.exports = router;