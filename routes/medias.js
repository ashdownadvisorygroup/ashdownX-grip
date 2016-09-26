/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */

var express = require('express');
var router = express.Router();
var multer = require('multer');
expressValidator = require('express-validator');
var util = require('util');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var MediaUser=mongoose.model('MediaUser');
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
require("../routes/users");
var mustBeConfig = require("../mustbe-config");
mustBe.configure(mustBeConfig);
mustBe= mustBe.routeHelpers();



router.post('/get_meta',passport.authenticate('jwt', { session: false}),function(req,res){
    var token = getToken(req.headers);
    if (token) {
        oembed(req.body.data, function(error, result) {
            if (error)
                res.json({"error" : true,"link" :req.body.data});
            else
                res.json(result);
        });
    }

});
router.param('media', function (req, res, next, id) {
    var token = getToken(req.headers);
    if (token) {
        var query = Media.findById(id);

        query.exec(function (err, media) {
            if (err) {
                return next(err);
            }
            if (!media) {
                return next(new Error('can\'t find media'));
            }

            req.media = media;
            return next();
        });
    }

});

router.get('/medias',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        Media.find(function (err, medias) {
            if (err) {
                return next(err);
            }

            res.json(medias);
        });
    }

});

router.get('/media/:media',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        res.json(req.media);
    }

});


router.post('/medias',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        var liv = new Media(req.body);

        liv.save(function (err, liv) {
            if (err) {
                return next(err);
            }

            res.json(liv);
        });
    }

});

router.route('/media/:media',passport.authenticate('jwt', { session: false})).put(function (req, res, next) {
    var token = getToken(req.headers);
    var mimetipe;
    if (token) {
        var maxSize = 10 * 1000 * 1000;
        const path = require('path');
        var upload = multer(
            {
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
        ).array('logo', 1);
        upload(req, res, function (err) {

            liv = req.media;
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
            console.log(req.files[0])
            var name;
            req.files.forEach(function(file) {

                //Generate filepath + filename here however you want
                var filepath = "./public/";
                if(["image/png","image/gif","image/jpg","image/jpeg"].indexOf(file.mimetype) > -1)
                {
                    var filename = "data/logos/"  + Date.now() + "-" + file.originalname.split(' ').join('_');
                }
                name=filename;
                console.log(name);
                fs.writeFile(filepath + filename, file.buffer);
            });

            req.checkBody('nom', 'Veuillez renseigne les nom').notEmpty();
            req.checkBody('nom', 'Veuillez ajouter des caractere aux nom').len(3, 20);
            var errors = req.validationErrors();
            if (errors) {
                res.json(errors, 422);
                return;
            }
            var acat;
            if (liv.categorie != req.body.categorie) {

                var query2 = Categorie.findById(liv.categorie);

                query2.exec(function (err, categorie) {
                    if (err) {
                        return next(err);
                    }
                    if (!categorie) {
                        return next(new Error('can\'t find categorie'));
                    }

                    acat = categorie;

                    acat.medias.splice(acat.medias.indexOf(liv._id), 1);
                    acat.save(function (err, acat) {
                        if (err) {
                            return next(err);
                        }

                    })

                    var quer = Categorie.findById(req.body.categorie);

                    quer.exec(function (err, ncat) {


                        liv.nom = req.body.nom;
                        liv.description = req.body.description;
                        liv.categorie = req.body.categorie;
                        liv.link = req.body.link;
                        liv.rating=req.body.rating;
                        liv.logo = name;
                        liv.save(function (err, liv) {
                            if (err) {
                                return next(err);
                            }

                            ncat.medias.push(liv)
                            ncat.save(function (err, ncat) {
                                if (err) {
                                    return next(err);
                                }
                                return res.json(liv);
                            });

                        });


                    });
                    return;


                });


            }
            else{
                liv.nom = req.body.nom;
                liv.description = req.body.description;
                liv.categorie = req.body.categorie;
                liv.link = req.body.link;
                liv.rating=req.body.rating;
                liv.logo = name;
                if(!name)liv.logo=req.body.logo;
                liv.save(function (err, liv) {
                    if (err) {
                        return next(err);
                    }
                    res.json(liv);
                });
            }

        })

    }

});//pour l'url
router.put('/medias/:media',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        var maxSize = 30 * 1000 * 1000;
        var mimetipe;
        const path = require('path');

        var upload = multer(
            {
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

            liv = req.media;
            var name = [];
            for (var index in req.files) {
                var file = req.files[index][0];
                console.log(file)
                //Generate filepath + filename here however you want
                var filepath = "./public/";
                console.log('un'+ file.mimetype);
                if(file.mimetype=="application/pdf")
                {
                    var filename = "data/pdfs/" + Date.now() + "-" + file.originalname.split(' ').join('_');
                }
                else if(file.mimetype=="audio/mp3")
                {
                    var filename = "data/audios/" + Date.now() + "-" + file.originalname.split(' ').join('_');
                }
                else if(file.mimetype=="video/mp4")
                {
                    var filename = "data/videos/" + Date.now() + "-" + file.originalname.split(' ').join('_');
                }
                else if(["image/png","image/gif","image/jpg","image/jpeg"].indexOf(file.mimetype) > -1)
                {
                    var filename = "data/logos/"  + Date.now() + "-" + file.originalname.split(' ').join('_');
                }
                name[index] = filename;
                console.log('filename'+name[index])
                fs.writeFile(filepath + filename, file.buffer);
            }
            req.checkBody('nom', 'Veuillez renseigne les nom').notEmpty();
            req.checkBody('nom', 'Veuillez ajouter des caractere aux nom').len(3, 20);
            var errors = req.validationErrors();
            if (errors) {
                res.json(errors, 422);
                return;
            }
            var acat;
            if (liv.categorie != req.body.categorie) {

                var query2 = Categorie.findById(liv.categorie);

                query2.exec(function (err, categorie) {
                    if (err) {
                        return next(err);
                    }
                    if (!categorie) {
                        return next(new Error('can\'t find categorie'));
                    }

                    acat = categorie;

                    acat.medias.splice(acat.medias.indexOf(liv._id), 1);
                    acat.save(function (err, acat) {
                        if (err) {
                            return next(err);
                        }

                    })

                    var quer = Categorie.findById(req.body.categorie);

                    quer.exec(function (err, ncat) {


                        liv.nom = req.body.nom;
                        liv.description = req.body.description;
                        liv.categorie = req.body.categorie;
                        liv.rating=req.body.rating;
                        liv.logo = name["logo"];
                        liv.link = name["link"];
                        if(!name["logo"])liv.logo=req.body.logo;
                        if(!name["link"])liv.link=req.body.link;
                        liv.save(function (err, liv) {
                            if (err) {
                                return next(err);
                            }

                            ncat.medias.push(liv)
                            ncat.save(function (err, ncat) {
                                if (err) {
                                    return next(err);
                                }
                                return res.json(liv);
                            });

                        });


                    });
                    return;


                });


            }
            else{
                console.log('else')
                liv.nom = req.body.nom;
                liv.description = req.body.description;
                liv.categorie = req.body.categorie;
                liv.rating=req.body.rating;
                liv.logo = name["logo"];
                liv.link = name["link"];
                if(!name["logo"])liv.logo=req.body.logo;
                if(!name["link"])liv.link=req.body.link;
                liv.save(function (err, liv) {
                    if (err) {
                        return next(err);
                    }
                    res.json(liv);
                });
            }
        });

    }

});//pour les fichiers



router.route('/media/:media',mustBe.authorized("admin"),passport.authenticate('jwt', { session: false})).delete(function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        Media.remove({
            _id: req.media._id
        }, function (err, movie) {
            if (err) {
                return res.send(err);
            }

            res.json({message: 'Successfully deleted'});
        });
    }

});


router.put('/medias/:media/downloaded',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        req.media.download(function (err, media) {
            if (err) {
                return next(err);
            }
            res.json(media);
        });
    }

});


router.get('/medias/:media/media_user',passport.authenticate('jwt', { session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        ids =decoded._id;
        id=req.media._id;
        var query = MediaUser.find( { media : id,user: ids} );
        query.exec(function (err, media_user) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");

            }
            if (!media_user) {
                return res.json("pas de mediaprofil correspondant a la recherche");
                return next(new Error('can\'t find categorie_profil'));
            }
            res.json(media_user);

        });
    }

});
router.put('/medias/:media/readed',passport.authenticate('jwt', { session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        req.media.read(function (err, media) {
            if (err) {
                return next(err);
            }
            res.json(media);
        });
    }

});

router.get('/download/:media',function (req, res) {
    var path = require('path');
    var mime = require('mime');
    var token = getToken(req.headers);
    if (token || true) {
        var file = 'public/' + req.media.link;
        var filename = path.basename(file);
        var mimetype = mime.lookup(file);
        res.setHeader('Content-disposition', 'attachment; filename=' +filename);
        res.setHeader('Content-type',mimetype);
        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
    }
});


module.exports = router;