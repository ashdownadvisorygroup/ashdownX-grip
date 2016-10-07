var express = require('express');
var router = express.Router();

/* GET home page. */
var mongoose = require('mongoose');
var Categorie = mongoose.model('Categorie');
var Media = mongoose.model('Media');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var CategorieProfil = mongoose.model('CategorieProfil');
var MediaUser = mongoose.model('MediaUser');
var CategorieMedia = mongoose.model('CategorieMedia');
var UserProfil = mongoose.model('UserProfil');
var ProfilCatUser = mongoose.model('ProfilCatUser');

router.get('/',function(req,res){
    res.render('index',{});
});

require('./categories');
require('./groups');
require('./profil');
require('./users');
require('./profil_categories');
require('./users_medias');
require('./medias');
require('./categorie_medias');
require('./user_profils');
require('./profil_categorie_users');
require('./search');

module.exports = router;
