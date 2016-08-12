/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */

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
var Livre = mongoose.model('Livre');
var util = require('util');
var fs = require('fs');

router.param('categorie', function (req, res, next, id) {
    console.log(id)
    var token = getToken(req.headers);
    console.log(req);

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
            console.log(categorie);

            req.categorie = new Categorie(categorie);
            return next();
        });
    }

});

router.get('/categories',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        /*var decoded = jwt.decode(token, config.secret);
        var ids=decoded._id;
        console.log(decoded);*/
        Categorie.find(function (err, categories) {
            if (err) {
                return next(err);
            }

            res.json(categories);
        });
    }

});

router.get('/categorie/:categorie',passport.authenticate('jwt', { session: false}), function (req, res) {

    var token = getToken(req.headers);
    console.log(req.categorie);
    if (token) {
        req.categorie.populate('livres', function (err, categorie) {
            if (err) {
                return next(err);
            }

            res.json(categorie);
        });
        //res.json(req.categorie);
    }

});

router.post('/categories',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        req.checkBody('nom', 'Veuillez renseigne les nom').notEmpty();
        req.checkBody('nom', 'Veuillez ajouter des caractere aux nom').len(3, 20);

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

router.put('/categorie/:categorie',passport.authenticate('jwt', { session: false}), function (req, res) {
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

router.delete('/categorie/:categorie',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        Categorie.remove({_id: req.categorie._id}, function (err, movie) {
            var quer = Categorie.findById("57a1a6934ebd15fc14135837")

            quer.exec(function (err, cat) {
                if (err) {
                    return next(err);
                }
                if (!cat) {
                    return res.json("error lor de la sauvegarde");
                    return next(new Error('can\'t find categorie'));
                }
                long=cat.livres.length;
                Array.prototype.push.apply(cat.livres, req.categorie.livres);
                for (var i = long-1, len = cat.livres.length; i < len; i++) {
                    var quer2 = Livre.findById(cat.livres[i]);
                    quer2.exec(function (err, livre) {

                        if (err) {
                            return next(err);
                        }
                        if (!cat) {
                            return res.json("error lor de la sauvegarde");
                            return next(new Error('can\'t find livre'));
                        }
                        livre.categorie=cat._id;
                        livre=new Livre(livre);
                        livre.save(function (err, liv) {
                            if (err) {
                                return next(err);
                            }

                            console.log(liv)

                        });

                    })
                }

                if (err) {
                    return res.send(err);
                }
                cat = new Categorie(cat);

                console.log(cat);

                cat.save(function (err, ct) {
                    if (err) {
                        return next(err);
                    }

                    console.log(ct)
                    cat = ct;

                });
                res.json({message: 'Successfully deleted'});

            })
        })
    }




});


router.route('/categories/:categorie/livre',passport.authenticate('jwt', { session: false})).post(function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        var maxSize = 10 * 1000 * 1000;
        const path = require('path');
        var upload = multer(
            {
                //storage: storage,
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
                var filename = "img/" + Date.now() + "-" + file.originalname.split(' ').join('_');
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
            var livre = new Livre(req.body);
            livre.categorie = req.categorie;
            livre.logo =name;
            livre.save(function (err, livre) {
                if (err) {
                    return next(err);
                }

                req.categorie.livres.push(livre);
                req.categorie.save(function (err, categorie) {
                    if (err) {
                        return next(err);
                    }

                    res.json(livre);
                });
            });
        })
    }


});//pour l'url
router.route('/categories/:categorie/livres',passport.authenticate('jwt', { session: false})).post(function (req, res, next) {//pour le fichier

    var token = getToken(req.headers);
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
            console.log(err)
            if (err) {
                res.status(404).json({msg: "erreur avec fichier"});
                return;
            }
            var name = [];
            for (var index in req.files) {

                var file = req.files[index][0];
                //Generate filepath + filename here however you want

                var filepath = "./public/";
                var filename = "img/" + index + "/" + Date.now() + "-" + file.originalname.split(' ').join('_');
                name[index] = filename;
                fs.writeFile(filepath + filename, file.buffer);
            }
            req.checkBody('nom', 'Veuillez renseigne les nom').notEmpty();
            req.checkBody('nom', 'Veuillez ajouter des caractere aux nom').len(3, 20);
            var errors = req.validationErrors();
            if (errors) {
                res.json(errors, 422);
                return;
            }
            var livre = new Livre(req.body);
            livre.categorie = req.categorie;

            livre.link = name["link"];
            livre.logo = name["logo"];
            livre.save(function (err, livre) {
                if (err) {
                    return next(err);
                }

                req.categorie.livres.push(livre);
                req.categorie.save(function (err, categorie) {
                    if (err) {
                        return next(err);
                    }

                    res.json(livre);
                });
            });
        })

    }




});


module.exports = router;