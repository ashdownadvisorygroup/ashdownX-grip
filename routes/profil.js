/**
 * Created by NOUBISSI TAPAH PHOEB on 16/08/2016.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var expressValidator = require('express-validator');
var util = require('util');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Profil = mongoose.model('Profil');
var UserProfil = mongoose.model('UserProfil');
var CategorieProfil = mongoose.model('CategorieProfil');
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
        //console.log(profil);

        req.profil = new Profil(profil);
        return next();
    });


});

router.get('/profils',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        Profil.find(function (err, profils) {
            if (err) {
                return next(err);
            }
            res.json(profils);
        });
    }

});
router.get('/profil/:profil/categorie_profil',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    //console.log(req.categorie_profil);
    if (token) {
        id=req.profil._id;
        var query = CategorieProfil.find().where('profil').equals(id).sort("rang").populate('categorie').populate('profil');
        query.exec(function (err, categorie_profil) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");
            }
            if (!categorie_profil) {
                return res.json("pas de mediaprofil correspondant a la recherche");
                return next(new Error('can\'t find categorie_profil'));
            }
            res.json(categorie_profil);
        });
    }

});
router.put('/categories/:categorie/:profil/categorie_profil',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        CategorieProfil.findOne( {categorie:req.params.categorie, profil:req.params.profil},function (err, prfcat) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");
            }
            prfcat.progression=req.body.progression;
            prfcat.save(function(err) {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                res.json('updated');
            });
        });

    }

});
router.get('/categories/:categorie/:profil/categorie_profil',passport.authenticate('jwt', { session: false}), function (req, res) {

    var token = getToken(req.headers);
    if (token) {
        CategorieProfil.findOne( {categorie:req.params.categorie, profil:req.params.profil},function (err, profcat) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");

            }

            res.json(profcat);

        });

    }

});
router.post('/categories/:categorie/:profil/categorie_profil',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var profcat=new CategorieProfil();
        profcat.categorie=req.params.categorie;
        profcat.profil=req.params.profil;
        profcat.progression=req.body.progression;
        profcat.save(function(err,ProfCat) {
            res.json(ProfCat);
        });
    }
});

router.get('/profil/:profil',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var d;
        var list=[];
        var list2=[];
        var b=req.params.profil;
       CategorieProfil.find()
            .where('profil').equals(mongoose.Types.ObjectId(req.params.profil))
            .sort({ rang : 1 })
            .populate('categorie')
            .exec(function (errmed, result){
                if (errmed) {
                    return next(errmed);
                }
                var query = UserProfil.find()
                    .where('profil').equals(mongoose.Types.ObjectId(req.params.profil))
                    .where('progression').equals("100")
                    .populate('user');
                query.exec(function (err, user_profil) {
                    if (err) {
                        console.log(err);
                        return res.json("il ya erreur dans la requete reessayer svp");
                    }
                    if (!user_profil) {
                        return res.json("pas de userprofil correspondant a la recherche");
                    }
                    user_profil.forEach(function(dat) {
                                list.push(dat.user);
                    });
                    UserProfil.find()
                        .where('profil').equals(mongoose.Types.ObjectId(req.params.profil))
                        .where('encadre').equals("true")
                        .populate('user')
                        .exec(function (err, profil_enc) {
                            if (err) {
                                console.log(err);
                                return res.json("il ya erreur dans la requete reessayer svp");
                            }
                            if (!profil_enc) {
                                return res.json("pas de userprofil correspondant a la recherche");
                            }
                            d = req.profil;
                            d.categorieprofil=[];
                            d.users=list;//liste des utilisateurs qui ont terminé le profil
                            profil_enc.forEach(function(dat) {
                                d.userprofil.push(dat.user);
                            });
                            var taille=result.length;
                            for(var i = 0; i<taille; i++) {
                                var obj={nom:"",description:"",rang:"",_id:""};
                                obj.nom=result[i].categorie.nom
                                obj.description=result[i].categorie.description
                                obj.rang=result[i].rang
                                obj._id=result[i].categorie._id;
                                d.categorieprofil[i]=obj;
                                //console.log(d)
                            }
                            res.json(d);
                        });




                });
            });


    }

});

router.post('/profils',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        console.log(req.body.categorie);
        req.checkBody('nom', 'Veuillez renseigne les nom').notEmpty();
        req.checkBody('nom', 'Veuillez ajouter des caractere aux nom').len(4, 60);
        var errors = req.validationErrors();
        if (errors) {
            res.json(errors, 422);
            return;
        }
        var prf = new Profil();
        prf.nom=req.body.nom;
        prf.description=req.body.description;
        prf.objectifs=req.body.objectifs;
        prf.save(function (err, prf) {
            if (err) {
                return next(err);
            }
            /**
             * la suite permet d'envoyer un tableau délement en une une ligne dans la base de donnée
             */
            var profCat = CategorieProfil.collection.initializeUnorderedBulkOp({useLegacyOps: true});
            var i=1;
            req.body.categorie.forEach(function(cat_id){
                console.log(typeof cat_id);
                profCat.insert({profil: prf._id, categorie:mongoose.Types.ObjectId(cat_id), progression: '0',rang:i});
                i++;
            });
            profCat.execute(function(er, result) {
                if(er) {
                    console.error(er);
                    return res.json({success: false, msg: "Erreur d'enregistrement."});
                } else {
                    res.json(prf);
                }
            });
        });
    }
});

router.put('/profil/:profil',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var obj=req.body;
        Profil.findByIdAndUpdate(req.params.profil,{$set: obj},function(err,prf) {
            if (err) {
                return next(err);
            }
            if(!prf) {
                return next(new Error('can\'t find user'));
            }
            if(req.body.categorie){
                var profCat = CategorieProfil.collection.initializeUnorderedBulkOp({useLegacyOps: true});
                profCat.find( { profil: prf._id } ).remove();
                profCat.execute(function(er, result) {
                    if(er) {
                        console.error(er);
                        return res.json({success: false, msg: "Erreur d'enregistrement."});
                    } else {
                        console.log(result.nRemoved)

                        var profCat2 = CategorieProfil.collection.initializeUnorderedBulkOp({useLegacyOps: true});
                        var i=1;
                        req.body.categorie.forEach(function(cat_id){
                            profCat2.insert({profil: prf._id, categorie:cat_id, progression: '0',rang:i});
                            i++;
                        });
                        profCat2.execute(function(er, result) {
                            if(er) {
                                console.error(er);
                                return res.json({success: false, msg: "Erreur d'enregistrement."});
                            } else {
                                res.json('updated');
                            }
                        });
                    }
                });
            }
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