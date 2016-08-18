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
require('./profil_medias');
require('./user_medias');
mongooseSeed()
    .then(function () {
        console.log('Success!');

    });
