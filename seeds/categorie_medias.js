/**
 * Created by NOUBISSI TAPAH PHOEB on 02/09/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var CategorieMedia = mongoose.model('CategorieMedia');
var Categorie = mongoose.model('Categorie');
var Media = mongoose.model('Media');
addSeed(CategorieMedia, {
    dependencies: [Media,Categorie],
    seed: function (media,categorie) {
        return [];
    }
});