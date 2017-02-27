/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var Media = mongoose.model('Media');
var Categorie = mongoose.model('Categorie');
addSeed(Media, {
    seed: function () {

        return [];
    }
});