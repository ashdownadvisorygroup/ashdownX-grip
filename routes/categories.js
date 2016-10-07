/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */


var mustBe = require("mustbe");
var mustBeConfig = require("../mustbe-config");
mustBe.configure(mustBeConfig);
mustBe= mustBe.routeHelpers();

var express = require('express');

var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var app = express();
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var Categorie = mongoose.model('Categorie');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var Media = mongoose.model('Media');
var CategorieMedia = mongoose.model('CategorieMedia');
var util = require('util');
var fs = require('fs');


router.param('categorie', function (req, res, next, id) {
    var token = getToken(req.headers);
    if (token) {

        if (id == undefined) {
            return next(new Error('categorie undifined'));
        }
        var query = Categorie.findById(id)

        query.exec(function (err, categorie) {
            if (err) {
                return next(err);
            }
            if (!categorie) {
                return res.json("error lor de la sauvegarde");
                return next(new Error('can\'t find categorie'));
            }
            req.categorie = new Categorie(categorie);
            return next();
        });
    }

});

router.get('/categories', function (req, res, next) {
    var token = getToken(req.headers);
    if (token || true) {
        /*var decoded = jwt.decode(token, config.secret);
        var ids=decoded._id;
        console.log(decoded);*/
        Categorie.find(function (err, categories) {
            if (err) {
                return next(err);
            }
            var list=[];
            categories.forEach(function(dat) {
                if(list.indexOf(dat._id) == -1){
                    list.push(dat._id);
                }
            });
            console.log(list)
            CategorieMedia.find()
                .where('categorie').in(list)
                .populate('media')
                .exec(function (errmed, result){
                    if (errmed) {
                        return next(errmed);
                    }
                    res.json({categories:categories, catmedias: result});
                });
        });
    }

});

router.get('/categorie/:categorie',passport.authenticate('jwt', { session: false}), function (req, res) {

    var token = getToken(req.headers);
    if (token) {
        var d;
        CategorieMedia.find()
                .where('categorie').equals(req.params.categorie)
                .populate('media')
                .exec(function (errmed, result){
                    if (errmed) {
                        return next(errmed);
                    }
                    d= req.categorie;
                   d.medias = [];
                    var taille=result.length;
                    for(var i = 0; i<taille; i++) {
                        d.medias[i]=(result[i].media);
                        console.log(d.medias)
                    }

                    res.json(d);
                });
    }

});

router.post('/categories', function (req, res, next) {
    var token = getToken(req.headers);
    if (token || true) {
        req.checkBody('nom', 'Veuillez renseigne les nom').notEmpty();
        req.checkBody('nom', 'Veuillez ajouter des caractere aux nom').len(7, 60);

        var errors = req.validationErrors();
        if (errors) {
            res.json(errors, 422);
            return;
        }
        var cat = new Categorie(req.body);
        cat.save(function (err, cat) {
            if (err) {
                return next(err);
            }

            res.json(cat);
        });
    }

});
router.put('/categorie/:categorie',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        cat = req.categorie;
        cat.nom = req.body.nom;
        cat.description = req.body.description;
        cat.save(function (err, cat) {
            if (err) {
                return next(err);
            }

            res.json(cat);
        });
    }
});
router.delete('/categorie/:categorie',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        Categorie.remove({_id: req.categorie._id}, function (err, movie) {
            var quer = Categorie.findOne({nom: 'par defaut'});//recherche de la categorie par defaut;

            quer.exec(function (err, cat) {
                if (err) {
                    return next(err);
                }
                if (!cat) {
                    return res.json("error lor de la sauvegarde");
                    return next(new Error('can\'t find categorie'));
                }
                long=cat.medias.length;
                console.log(req.params.categorie)
                var query = CategorieMedia.find().where('categorie').equals(req.params.categorie);
                query.exec(function (err, categorie_media) {
                    if (err) {
                        console.log(err);
                        return res.json("il ya erreur dans la requete reessayer svp");
                    }
                    if (!categorie_media) {
                        return res.json("pas de categorie_medias correspondant a la recherche");
                        return next(new Error('can\'t find categorie_medias'));
                    }

                    for (var i =0, len = categorie_media.length; i < len; i++) {
                        categorie_media[i].categorie=cat._id;
                        categorie_media[i].save(function (err, ct) {
                            if (err) {
                                return next(err);
                            }
                        });
                    }

                    res.json({message: 'Successfully deleted'});
                });
            })
        })

    }
});


router.route('/categories/:categorie/media',passport.authenticate('jwt', { session: false})).post(function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        var maxSize = 10 * 1000 * 1000;
        const path = require('path');
        var upload = multer(
            {//storage: storage,
                limits: {fileSize: maxSize},
                fileFilter: function (req, file, cb) {
                    var filetypes = /jpeg|jpg|pdf|mp4|png|gif|mp3/;
                    var mimetype = filetypes.test(file.mimetype);
                    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                    if (mimetype && extname) {
                        return cb(null, true);
                    }
                    return cb("phoebe", false);
                }
            }
        ).array('logo', 1);
        upload(req, res, function (err) {
            if (err == "phoebe") {
                res.status(422).json({msg: "probleme avec fichier"});
                return;
            }
            console.log(err)
            if (err) {
                res.status(404).json({msg: "erreur avec fichier"});
                return;
            }
            var file = req.files[0];
            var name;
            req.files.forEach(function(file) {

                //Generate filepath + filename here however you want
                var filepath = "./public/";
                if(["image/png","image/gif","image/jpg","image/jpeg"].indexOf(file.mimetype) > -1)
                {
                    var filename = "data/logos/"  + Date.now() + "-" + file.originalname.split(' ').join('_');
                }
                name=filename;
                fs.writeFile(filepath + filename, file.buffer);
            });

            req.checkBody('nom', 'Veuillez renseigne les nom').notEmpty();
            req.checkBody('nom', 'Veuillez ajouter des caractere aux nom').len(3, 20);
            var errors = req.validationErrors();
            if (errors) {
                res.json(errors, 422);
                return;
            }
            var media = new Media(req.body);
            media.categorie = req.categorie;
            media.logo =name;
            media.save(function (err, media) {
                if (err) {
                    return next(err);
                }

                var  CatMed= CategorieMedia.collection.initializeUnorderedBulkOp({useLegacyOps: true});
                CatMed.insert({media: media._id, categorie:req.params.categorie});
                CatMed.execute(function(er, result) {
                    if(er) {
                        console.error(er);
                        return res.json({success: false, msg: "Erreur d'enregistrement."});
                    }
                    res.json(media);
                });
            });
        })
    }


});//pour l'url
router.route('/categories/:categorie/medias',passport.authenticate('jwt', { session: false}))
    .post(function (req, res, next) {//pour le fichier
        var token = getToken(req.headers);
    var mimetipe;
    if (token) {
        var maxSize = 30 * 1000 * 1000;
        const path = require('path');

        var upload = multer(
            {
                //storage: storage,
                limits: {fileSize: maxSize},
                fileFilter: function (req, file, cb) {
                    var filetypes = /jpeg|jpg|pdf|mp4|png|gif|mp3/;
                    var mimetype = filetypes.test(file.mimetype);
                    mimetipe=file.mimetype;
                    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                    if (mimetype && extname) {
                        return cb(null, true);
                    }
                    return cb("phoebe", false);

                }
            }
        ).fields([{name: 'link', maxCount: 1}, {name: 'logo', maxCount: 1}]);

        upload(req, res, function (err) {

            if (err == "phoebe") {
                res.status(422).json({msg: "probleme avec fichier"});
                return;
            }
            if (err) {
                res.status(404).json({msg: "erreur avec fichier"});
                return;
            }
            var name = [];
            for (var index in req.files) {
                var file = req.files[index][0];
                //Generate filepath + filename here however you want

                var filepath = "./public/";
                if(["image/png","image/gif","image/jpg","image/jpeg"].indexOf(file.mimetype) > -1)
                {
                    var filename = "data/logos/"  + Date.now() + "-" + file.originalname.split(' ').join('_');
                }
                if(["application/pdf","application/PDF"].indexOf(file.mimetype) > -1)
                {
                    var filename = "data/pdfs/"  + Date.now() + "-" + file.originalname.split(' ').join('_');
                }
                else if(["audio/mp3","audio/MP3"].indexOf(file.mimetype) > -1)
                {
                    var filename = "data/audios/"  + Date.now() + "-" + file.originalname.split(' ').join('_');
                }
                else if(["video/mp4","video/MP4"].indexOf(file.mimetype) > -1)
                {
                    var filename = "data/videos/" + Date.now() + "-" + file.originalname.split(' ').join('_');
                }

                name[index] = filename;
                fs.writeFile(filepath + filename, file.buffer);
            }
            req.checkBody('nom', 'Veuillez renseigne les nom').notEmpty();
            req.checkBody('nom', 'Veuillez ajouter des caractere aux nom').len(3, 60);
            var errors = req.validationErrors();
            if (errors) {
                res.json(errors, 422);
                return;
            }
            var media = new Media(req.body);
            media.link = name["link"];
            media.logo = name["logo"];
            console.log(media)
            media.save(function (err, media) {
                if (err) {
                    return next(err);
                }
                var  CatMed= CategorieMedia.collection.initializeUnorderedBulkOp({useLegacyOps: true});
                CatMed.insert({media: media._id, categorie:req.params.categorie});
                CatMed.execute(function(er, result) {
                    if(er) {
                        console.error(er);
                        return res.json({success: false, msg: "Erreur d'enregistrement."});
                    }
                    res.json(media);
                });

            });
        });

    }
});

router.get('/categorie/:categorie/categorie_medias',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        id=req.categorie._id;
        var query = CategorieMedia.find().where('categorie').equals(id).sort("rang").populate('media').populate('categorie');
        query.exec(function (err, categorie_media) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");
            }
            if (!categorie_media) {
                return res.json("pas de categorie_medias correspondant a la recherche");
                return next(new Error('can\'t find categorie_medias'));
            }
            res.json(categorie_media);
        });
    }

});




module.exports = router;