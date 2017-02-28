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
            progression:0,
            categorie:categorie[0],
            profil:profil[0],
        }, {
            rang: 2,
            progression:0,
            categorie:categorie[11],
            profil:profil[0]

        },{
            rang: 3,
            progression:0,
            categorie:categorie[5],
            profil:profil[0],
        },{
            rang: 4,
            progression:0,
            categorie:categorie[3],
            profil:profil[0],
        },{
            rang: 5,
            progression:0,
            categorie:categorie[8],
            profil:profil[0],
        },{
            rang: 1,
            progression:0,
            categorie:categorie[6],
            profil:profil[1],

        }, {
            rang: 2,
            progression:0,
            categorie:categorie[13],
            profil:profil[1],

        }, {
            rang: 3,
            progression:0,
            categorie:categorie[1],
            profil:profil[1],

        },{
            rang:4,
            progression:0,
            categorie:categorie[12],
            profil:profil[1],

        },{
            rang: 5,
            progression:0,
            categorie:categorie[3],
            profil:profil[1],

        },{
            rang: 6,
            progression:0,
            categorie:categorie[8],
            profil:profil[1],

        }, {
            rang: 1,
            progression:0,
            categorie:categorie[0],
            profil:profil[2],
        }, {
            rang: 2,
            progression:0,
            categorie:categorie[6],
            profil:profil[2],

        }, {
            rang: 3,
            progression:0,
            categorie:categorie[7],
            profil:profil[2],
        },{
            rang: 4,
            progression:0,
            categorie:categorie[2],
            profil:profil[2],
        },{
            rang: 5,
            progression:0,
            categorie:categorie[4],
            profil:profil[2],
        },{
            rang: 6,
            progression:0,
            categorie:categorie[14],
            profil:profil[2],
        }, {
            rang: 1,
            progression:0,
            categorie:categorie[0],
            profil:profil[3],

        },{
            rang: 2,
            progression:0,
            categorie:categorie[4],
            profil:profil[3],

        }, {
            rang: 3,
            progression:0,
            categorie:categorie[6],
            profil:profil[3],

        },  {
            rang: 4,
            progression:0,
            categorie:categorie[7],
            profil:profil[3],

        }, {
            rang: 5,
            progression:0,
            categorie:categorie[10],
            profil:profil[3],
        }, {
            rang: 6,
            progression:0,
            categorie:categorie[11],
            profil:profil[3],
        }];
    }
})