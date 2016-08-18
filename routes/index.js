var express = require('express');
var router = express.Router();

/* GET home page. */
var mongoose = require('mongoose');
var Categorie = mongoose.model('Categorie');
var Media = mongoose.model('Media');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var MediaProfil = mongoose.model('MediaProfil');
var MediaUser = mongoose.model('MediaUser');

router.get('/',function(req,res){
    res.render('index',{});
});

require('./categories');
require('./groups');
require('./profil');
require('./users');
require('./profil_medias');
require('./users_medias');
require('./medias');

module.exports = router;
