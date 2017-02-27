/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var Profil = mongoose.model('Profil');
addSeed(Profil, {
    seed: function () {

        return [];
    }
});