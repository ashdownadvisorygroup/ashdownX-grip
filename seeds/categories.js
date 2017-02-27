/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */

var mongoose = require('mongoose');

const addSeed = require('mongoose-plugin-seed').addSeed;

var Media = mongoose.model('Media');

var Categorie = mongoose.model('Categorie');
addSeed(Categorie, {
    dependencies: [Media],
    seed: function (medias) {

        return [];
    }
});
