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
        return [{
            rang: 1,
            categorie:categorie[0],
            profil:profil[0],
            progression:0
        }, {
            rang: 2,
            categorie:categorie[1],
            profil:profil[0],
            progression:0

        },{
            rang: 25,
            categorie:categorie[3],
            profil:profil[4],
            progression:0

        },{
            rang: 2,
            categorie:categorie[3],
            profil:profil[3],
            progression:0

        }, {
            rang: 3,
            categorie:categorie[2],
            profil:profil[1],
            progression:0

        }, {
            rang: 9,
            categorie:categorie[1],
            profil:profil[1],
            progression:0

        }, {
            rang: 11,
            categorie:categorie[2],
            profil:profil[2],
            progression:0

        }, {
            rang: 13,
            categorie:categorie[2],
            profil:profil[3],
            progression:0

        }, {
            rang: 4,
            categorie:categorie[3],
            profil:profil[0],
            progression:0

        }, {
            rang: 5,
            categorie:categorie[4],
            profil:profil[2],
            progression:0

        },{
            rang: 24,
            categorie:categorie[4],
            profil:profil[1],
            progression:0

        }, {
            rang: 22,
            categorie:categorie[4],
            profil:profil[3],
            progression:0

        },  {
            rang: 29,
            categorie:categorie[2],
            profil:profil[4],
            progression:0

        }, {
            rang: 21,
            categorie:categorie[4],
            profil:profil[4],
            progression:0

        }];
    }
})