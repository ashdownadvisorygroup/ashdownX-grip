/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var CategorieProfil = mongoose.model('CategorieProfil');
var Profil = mongoose.model('Profil');
var Categorie = mongoose.model('Categorie');
addSeed(CategorieProfil, {
    dependencies: [Categorie,Profil],
    seed: function (categorie,profil) {
        return [];
    }
})