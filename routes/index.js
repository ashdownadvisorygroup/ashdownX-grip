var express = require('express');
var router = express.Router();

/* GET home page. */
var mongoose = require('mongoose');
var Categorie = mongoose.model('Categorie');
var Livre = mongoose.model('Livre');
var Livre = mongoose.model('Livre');

router.get('/',function(req,res){
    res.render('index',{});
});

require('./categories');

module.exports = router;
