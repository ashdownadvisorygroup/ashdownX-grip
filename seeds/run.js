/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/bv');
const mongooseSeed = require('mongoose-plugin-seed').seed;
require("../models/index");
require('./categories');
require('./medias');
require('./users');
require('./groups');
require('./profils');
require('./profil_categories');
require('./user_medias');
require('./categorie_medias');
require('./user_profils');
mongooseSeed()//cette fonction retourne une promesse
    .then(function () {
        console.log('Success!');

    },function(err){
        console.log(err);
        console.log('Echec!')
    });

