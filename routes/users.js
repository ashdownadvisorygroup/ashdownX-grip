var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var Group = mongoose.model('Group');
var Profil = mongoose.model('Profil');
var MediaUser = mongoose.model('MediaUser');
var Categorie = mongoose.model('Categorie');
var CategorieMedia = mongoose.model('CategorieMedia');
var UserProfil = mongoose.model('UserProfil');
var ProfilCatUser = mongoose.model('ProfilCatUser');
var CategorieProfil = mongoose.model('CategorieProfil');
var Media = mongoose.model('Media');
var passport = require('passport');
var jwt = require('jwt-simple');
var ejs = require('ejs');
var config = require('../config/database');
var appRoot = require('app-root-path');

var multer = require('multer');
var fs = require('fs');
function removeDuplicates(arr, prop) {
    var new_arr = [];
    var lookup  = {};

    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
        new_arr.push(lookup[i]);
    }

    return new_arr;
}//fonction qui prend en entrée un tableau d'objects json et une de ses clés et filtre le tableau pour ladite clé à valeur unique

router.get('/search', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);

    if (token) {
        if(req.query.search.length==0){
            res.json({profils:[],groups:[],users:[],médias:[],catégories:[]});
            return;
        }

        async.waterfall([
            function (done) {
                Profil.find().where("nom").regex(req.query.search).exec(function (err,prf ){
                    Profil.find().where("description").regex(req.query.search).exec(function (err,prfs ){
                        prf=prf.concat(prfs);
                        prf=removeDuplicates(prf, "id");
                            Profil.find().where("objectifs").regex(req.query.search).exec(function (err,prfo ){
                                prf=prf.concat(prfo);
                                prf = removeDuplicates(prf, "id");
                                done(err,prf)
                            });
                    });
                });

            },
            function (prf, done) {
                Group.find().where("nom").ne('superadmin').regex(req.query.search).exec(function (err,grp ){
                    Group.find().where("description").ne('superadmin').regex(req.query.search).exec(function (err,grpd ){
                        grp=grp.concat(grpd);
                        grp=removeDuplicates(grp, "id");
                        done(err,prf,grp)
                    });
                });
            },
            function (prf,grp, done) {
                User.find().where("name").regex(req.query.search).exec(function (err,usr ){
                    done(err,prf,grp,usr)
                });
            },function (prf,grp,usr, done) {
                Media.find().where("nom").regex(req.query.search).exec(function (err,med ){
                    Media.find().where("description").regex(req.query.search).exec(function (err,medd ){
                        med=med.concat(medd);
                        med=removeDuplicates(med, "id");
                        done(err,prf,grp,usr,med)
                    });
                });
            },function (prf,grp,usr,med, done) {
                Categorie.find().where("nom").regex(req.query.search).exec(function (err,cat ){
                    Categorie.find().where("description").regex(req.query.search).exec(function (err,catd ){
                        cat=cat.concat(catd);
                        cat=removeDuplicates(cat, "id");
                        res.json({profils:prf,groups:grp,users:usr,médias:med,catégories:cat});

                        done(err,prf,grp,usr,med,cat);
                    });
                });
            },

        ], function (err) {
            if (err) {
                res.status(500).json({msg: "erreur "});
                return;
            }

        });
    }
});
/* GET users listing. */
router.get('/users', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {

        User.find(function (err, users) {
            if (err) {
                return next(err);
            }

            res.json(users);
        });
    }

});
router.param('user', function (req, res, next, id) {
    var query = User.findById(id);
    query.exec(function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new Error('can\'t find user'));
        }
        req.user = new User(user);
        return next();
    });
});
router.get('/user/:user', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        var query = User.findById(req.params.user);
        query.exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                console.log('can\'t find user');
                return next(new Error('can\'t find user'));
            }
            UserProfil.find()
                .where('user').equals(req.params.user)
                .where('encadre').equals('false')
                .populate('profil')
                .exec( function (err, userprof) {
                    user.userprofil=userprof;
                    user.populate('groups')
                        .populate('profil')
                        .populate('encadreur')
                        .populate('master', function (err, user) {
                            if (err) {
                                return next(err);
                            }
                            Profil.find()
                                .where("description").regex(req.query.search).exec(function (err,prfs ){
                            });
                            res.json(user);
                        });
                });
         });
    }
});
router.get('/users/:user/media_user', passport.authenticate('jwt', {session: false}), function (req, res) {

    var token = getToken(req.headers);
    if (token) {
        var query = MediaUser.find({user: req.params.user});

        query.exec(function (err, media_user) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");

            }
            if (!media_user) {
                return res.json("pas de mediaprofil correspondant a la recherche");
                return next(new Error('can\'t find media_user'));
            }
            res.json(media_user);

        });
    }

});
router.get('/profil_users', passport.authenticate('jwt', {session: false}), function (req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        var iduser = decoded._id;
        var query = User.find({"profil": {$in: decoded.encadreur}});
        query.exec(function (err, profil_user) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");
            }
            if (!profil_user) {
                return res.json("pas de mediaprofil correspondant a la recherche");
                return next(new Error('can\'t find categorie_profil'));
            }
            res.json(profil_user);
        });
    }

});
router.get('/media/:media/media_user', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var tab = [];
        var query = MediaUser.find({media: req.params.media});
        query.exec(function (err, media_user) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");
            }
            if (!media_user) {
                return res.json("pas de mediaprofil correspondant a la recherche");
                return next(new Error('can\'t find categorie_profil'));
            }
            for (var i = 0, len = media_user.length; i < len; i++) {
                tab.push(media_user[i].notation);
            }
            var total = 0;
            for (var i = 0, len = tab.length; i < len; i++) {
                total += tab[i];
            }
            var avg = total / tab.length;
            var obj = {rate: ""};
            obj.rate = avg;
            Media.findByIdAndUpdate(req.params.media, {$set: obj}, function (err, client) {
                if (err) {
                    return next(err);
                }
                if (!client) {
                    return next(new Error('can\'t find user'));
                }
                res.json('updated');
            });
        });
    }

});
router.put('/medias/:user/:media/media_user', passport.authenticate('jwt', {session: false}), function (req, res) {

    var token = getToken(req.headers);
    if (token) {
        MediaUser.findOne({user: req.params.user, media: req.params.media}, function (err, media) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");
            }
            media.notation = req.body.notation;
            media.save(function (err) {
                if (err) {
                    console.log(err)
                    res.send(err);
                }
                res.json('updated');
            });
        });
    }
});
router.get('/medias/:user/:media/media_user', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        MediaUser.findOne({user: req.params.user, media: req.params.media}, function (err, media) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");
            }
            res.json(media);
        });
    }
});
router.post('/medias/:user/:media/media_user', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        var iduser = decoded._id;
        var usermed = new MediaUser();
        usermed.user = req.params.user;
        usermed.media = req.params.media;
        usermed.notation = req.body.notation;

        usermed.save(function (err, newUser) {
            res.json(newUser);
        });

    }

});
router.put('/users/:user/:profil/user_profil', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        UserProfil.findOne({user: req.params.user, profil: req.params.profil}, function (err, userprof) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");
            }
            if (!req.body.progression) {
                userprof.progression = 0;
            }
            else {
                userprof.progression = req.body.progression;
            }
            userprof.save(function (err, Us) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                ProfilCatUser.findOne({
                    user: req.params.user,
                    profil: req.params.profil,
                    categorie: req.body.categorie
                }, function (e1, p1) {
                    var val;
                    if (!req.body.etat) {
                        val = "";
                    }
                    else {
                        val = req.body.etat
                    }
                    if (e1) {
                        res.json(e1);
                    } else {
                        if (p1) {
                            ProfilCatUser.update({
                                    user: req.params.user,
                                    profil: req.params.profil,
                                    categorie: req.body.categorie
                                }, {etat: val},
                                function (err, count) {
                                    console.log(count)
                                    res.json('updated');
                                });
                        } else {
                            ProfilCatUser.create({
                                user: req.params.user,
                                profil: req.params.profil,
                                categorie: req.body.categorie,
                                etat: val
                            }, function (err, obj) {
                                res.json(Us);
                                console.log(obj)
                            });
                        }
                    }
                })
            });
        });
    }
});
router.get('/users/:user/:profil/user_profil', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        UserProfil.findOne({user: req.params.user, profil: req.params.profil}, function (err, userprof) {
            if (err) {
                console.log(err);
                return res.json("il ya erreur dans la requete reessayer svp");
            }
            res.json(userprof);
        });
    }
});
router.post('/users/:user/:profil/user_profil', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var userprof = new UserProfil();
        userprof.user = req.params.user;
        userprof.profil = req.params.profil;
        userprof.progression = req.body.progression;
        userprof.save(function (err, UserProf) {
            ProfilCatUser.create({
                user: req.params.user,
                profil: req.params.profil,
                categorie: req.body.categorie,
                etat: req.body.etat
            }, function (err, obj) {
                res.json(UserProf);

            });
        });
    }

});

router.post('/signup', passport.authenticate('jwt', {session: false}), function (req, res, next) {

    var newUser = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });
    if (req.files == undefined) {
        var maxSize = 30 * 1000 * 1000;
        const path = require('path');

        var upload = multer(
            {
                limits: {fileSize: maxSize},
                fileFilter: function (req, file, cb) {
                    var filetypes = /jpeg|jpg|png|gif/;
                    var mimetype = filetypes.test(file.mimetype);
                    mimetipe = mimetype;
                    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                    if (mimetype && extname) {
                        return cb(null, true);
                    }
                    return cb("phoebe", false);

                }
            }
        ).array('photo', 1);

        upload(req, res, function (err) {
            var newUser = new User({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            });
            if (err == "phoebe") {
                res.status(422).json({msg: "probleme avec fichier"});
                return;
            }
            if (err) {
                res.status(404).json({msg: "erreur avec fichier"});
                return;
            }
            var name = "";

            if (req.files != undefined) {
                req.files.forEach(function (file) {

                    //Generate filepath + filename here however you want
                    var filepath = "./public/";
                    var filename = "data/photos/" + Date.now() + "-" + file.originalname.split(' ').join('_');
                    name = filename;
                    fs.writeFile(filepath + filename, file.buffer);
                });
            }


            newUser.photo = name;

            newUser.save(function (err, newUser) {
                if (err) {
                    console.log(err);
                    return res.json({success: false, msg: 'utilisateur ou email deja existant.'});
                }
                if (req.body.master) {
                    newUser.master.push.apply(newUser.master, req.body.master);
                   /* var mas=req.body.master;
                    var profUser = UserProfil.collection.initializeUnorderedBulkOp({useLegacyOps: true});
                    req.body.profil.forEach(function (prof_id) {
                        profUser.insert({user: newUser._id, profil: prof_id, progression: '0'});
                    });*/

                }
                if (req.body.encadreur) {
                    newUser.encadreur.push.apply(newUser.encadreur, req.body.encadreur);
                }
                newUser.groups.push.apply(newUser.groups, req.body.groups);
                newUser.profil.push.apply(newUser.profil, req.body.profil);
                newUser.save(function (error, data) {
                    if (error) {
                        return res.json({success: false, msg: "Erreur d'enregistrement."});
                    }
                    /**
                     * la suite permet d'envoyer un tableau délement en une une ligne dans la base de donnée
                     */
                    var profUser = UserProfil.collection.initializeUnorderedBulkOp({useLegacyOps: true});
                    var profUser2 = UserProfil.collection.initializeUnorderedBulkOp({useLegacyOps: true});
                    if(req.body.profil){
                        req.body.profil.forEach(function (prof_id) {
                            profUser.insert({user: newUser._id, profil: prof_id, progression: '0',encadre:'false'});
                        });
                    }
                    if(req.body.encadreur){
                        req.body.encadreur.forEach(function (prof_id) {
                            profUser2.insert({user: newUser._id, profil: prof_id, progression: '0',encadre:'true'});
                        });
                    }
                    profUser2.execute(function(err,res){
                        profUser.execute(function (er, result) {
                            if (er) {
                                console.error(er);
                                return res.json({success: false, msg: "Erreur d'enregistrement."});
                            } else {
                                var Transport = nodemailer.createTransport({
                                    service: 'Gmail',
                                    auth: {
                                        user: 'phibi.noubissi@gmail.com',
                                        pass: 'phibi1234'
                                    }
                                });
                                var data = {
                                    nom: newUser.name,
                                    prenom: newUser.prenom,
                                    password: req.body.password
                                };
                                var content=ejs.renderFile(__dirname + '/../emails/welcome/welcome.ejs', data, function (err, data) {
                                    var mailOptions = {
                                        to: newUser.email,
                                        from: 'phibi.noubissi@gmail.com',
                                        subject: 'Compte crée',
                                        html: data,
                                        attachments: [{
                                            filename: 'GRIP_Logo.png',
                                            path: 'https://cask.scotch.io/2014/10/04-sample-app.png',
                                            cid: 'ashdownx_logo' //same cid value as in the html img src
                                        },{
                                            filename: 'Ashdown Advisory Group.png',
                                            path: appRoot + '/emails/welcome/Ashdown Advisory Group.png',
                                            cid: 'logo_ashdown' //same cid value as in the html img src
                                        },{   // file on disk as an attachment
                                            filename: 'welcome.txt',
                                            path: __dirname + '/../emails/welcome/welcome.txt' // stream this file
                                        },]
                                    };
                                    Transport.sendMail(mailOptions, function (err) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        if (res.headersSent) {
                                            console.log(res.headersSent);
                                        }
                                        res.json({success: true, msg: newUser});
                                    });
                                })

                            }
                        });
                    })
                });
            });
        });
    }
});//post users
router.put('/user/:user', passport.authenticate('jwt', {session: false}), function (req, res, next) {//pour le stagiaire
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        var maxSize = 30 * 1000 * 1000;
        const path = require('path');

        var upload = multer(
            {
                limits: {fileSize: maxSize},
                fileFilter: function (req, file, cb) {
                    var filetypes = /jpeg|jpg|png|gif/;
                    var mimetype = filetypes.test(file.mimetype);
                    mimetipe = mimetype;
                    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                    if (mimetype && extname) {
                        return cb(null, true);
                    }
                    return cb("phoebe", false);

                }
            }
        ).array('photo', 1);
        upload(req, res, function (err) {
            if (err == "phoebe") {
                res.status(422).json({msg: "probleme avec fichier"});
                return;
            }
            if (err) {
                res.status(404).json({msg: "erreur avec fichier"});
                return;
            }
            var name;
            var obj = req.body;
            console.log(req.files)
            if (req.files == undefined || req.files.length == 0) {
                delete obj.photo;
            }
            else if (req.files.length != 0 || req.files != undefined) {
                req.files.forEach(function (file) {
                    //Generate filepath + filename here however you want
                    var filepath = "./public/";
                    var filename = "data/photos/" + Date.now() + "-" + file.originalname.split(' ').join('_');
                    name = filename;
                    fs.writeFile(filepath + filename, file.buffer);
                });
                obj.photo = name;
            }

            if (req.body.password) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return next(err);
                    }
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        if (err) {
                            return next(err);
                        }
                        obj.password = hash;
                        User.findByIdAndUpdate(req.params.user, {$set: obj}, function (err, client) {
                            if (err) {
                                console.log(err);
                                return next(err);
                            }
                            if (!client) {
                                return next(new Error('can\'t find user'));
                            }
                            res.json('updated');
                        });
                    });
                });

            } else {
                User.findByIdAndUpdate(req.params.user, {$set: obj}, function (err, client) {
                    if (err) {
                        return next(err);
                    }
                    if (!client) {
                        return next(new Error('can\'t find user'));
                    }
                    res.json('updated');
                });
            }


        });


    }
});
router.get('/users', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        User.find(function (err, users) {
            if (err) {
                return next(err);
            }

            res.json(users);
        });
    }

});
router.post('/authenticate', function (req, res) {//login

    User.findOne({name: req.body.name/*,roups: req.body.groups*/}, function (err, user) {
        if (err || !user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token;
                    user.populate('groups', function (err, useri) {
                        if (err) {
                            return next(err);
                        }
                        token = jwt.encode(useri, config.secret);
                        console.log(useri);
                    })
                    // return the information including token as JSON
                    user.populate('groups')
                        .populate('profil')
                        .populate('encadreur')
                        .populate('master', function (err, user) {
                            if (err) {
                                return next(err);
                            }


                            var users = {
                                success: "",
                                name: "",
                                permissions: [],
                                permiNotations: [],
                                profilSupervise: [],
                                token: "",
                                id: "",
                                profilActuel: []
                            };
                            users.success = true;
                            users.name = user.name;
                            for (var i = 0, len = user.groups.length; i < len; i++) {
                                users.permissions[i] = user.groups[i].nom;//pour les permissins
                            }
                            for (var i = 0, len = user.profil.length; i < len; i++) {

                                /* users.profilActuel[i]=user.profil[i].nom;*/
                                users.profilActuel.push({id: user.profil[i]._id, nom: user.profil[i].nom});
                            }
                            for (var i = 0, len = user.master.length; i < len; i++) {
                                users.permiNotations.push({id: user.master[i]._id, nom: user.master[i].nom});
                            }
                            for (var i = 0, len = user.encadreur.length; i < len; i++) {

                                /* users.profilActuel[i]=user.profil[i].nom;*/
                                users.profilSupervise.push({id: user.encadreur[i]._id, nom: user.encadreur[i].nom});
                            }
                            users.token = 'JWT ' + token;
                            users.id = user._id;


                            res.json(users);
                        });
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

router.get('/forgot', function (req, res) {
    res.render('forgot', {
        user: req.user
    });
});

router.post('/forgot', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });

        },
        function (token, done) {
            User.findOne({email: req.body.email}, function (err, user) {
                if (!user) {
                    res.json('error No account with that email address exists. ');
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
                user.save(function (err) {
                    if (err) {
                        cosole.log('erreur')
                        console.log(err)
                    }
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var Transport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'phibi.noubissi@gmail.com',
                    pass: 'phibi1234'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'nphoeb@gmail.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                attachments: [
                    {   // file on disk as an attachment
                        filename: 'text3.txt',
                        path: 'public/data/txt/text3.txt' // stream this file
                    }
                ]
            };
            Transport.sendMail(mailOptions, function (err) {
                if (err) {
                    console.log('erreur de connection1')
                    console.log(err)
                    res.status(500).json({msg: "erreur pas de connection1"});
                    return;
                }
                if (res.headersSent) {
                    console.log(res.headersSent)
                    console.log('erreur de connexion2')
                    res.status(500).json({msg: "erreur pas de connection2"});
                    return;

                }
                res.json({token: token, msg: 'envoye'});
            });
        }
    ], function (err) {
        if (err) {
            console.log('erreur vrai')
            console.log("erreur lors de l'envoi")
            res.status(500).json({msg: "erreur lors de l'envoie"});
            return;
        }

    });
});
router.get('/reset/:token', function (req, res) {
    console.log(req.params.token)
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, function (err, user) {
        console.log(user)
        console.log(err)

        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.json('error');
        }
        req.session.resetToken = user;
        res.redirect('/');

    });
});
router.get('/check-reset', function (req, res) {
    if (req.session.resetToken) {
        delete req.session.resetToken;
        res.json('true');
    }
});
router.post('/reset/:token', function (req, res) {
    async.waterfall([
        function (done) {
            console.log('un')
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {$gt: Date.now()}
            }, function (err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.json('back');
                }
                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.save(function (err) {
                    if (err)res.json('echec');
                    console.log(err);
                    console.log('user1')
                    res.json(user);
                });
            });
        },
        function (user, done) {
            console.log('deux')
            var Transport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'phibi.noubissi@gmail.com',
                    pass: 'phibi1234'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };

            Transport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    res.end("error");
                    done(err);
                } else {
                    console.log('bien')
                    req.flash('success', 'Success! Your password has been changed.');
                    res.end("sent");
                }
            });
        }
    ], function (err) {
        console.log('erreur finale')
        res.redirect('/');
    });
});
router.get('/memberinfo', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            name: decoded.name
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {

                res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});
router.delete('/user/:user', passport.authenticate('jwt', {session: false}), function (req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        User.remove({
            _id: req.params.user
        }, function (err, user) {
            if (err) {
                return res.send(err);
            }
            res.json({message: 'Successfully deleted'});
        });
    }

});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
