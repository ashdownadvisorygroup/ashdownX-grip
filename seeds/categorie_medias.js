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
        return [{
            categorie:categorie[0],
            media:media[0]
        }, {
            categorie:categorie[1],
            media:media[6]

        } ,{
            categorie:categorie[1],
            media:media[7]
        }, {
            categorie:categorie[1],
            media:media[27]
        }, {
            categorie:categorie[2],
            media:media[13]
        }, {

            categorie:categorie[2],
            media:media[14]

        },{
            categorie:categorie[2],
            media:media[15]
        }, {
            categorie:categorie[2],
            media:media[21]

        } ,{
            categorie:categorie[2],
            media:media[32]
        },{
            categorie:categorie[2],
            media:media[34]
        }, {
            categorie:categorie[3],
            media:media[18]
        }, {
            categorie:categorie[3],
            media:media[19]
        }, {
            categorie:categorie[3],
            media:media[20]
        }, {
            categorie:categorie[3],
            media:media[26]
        },  {
            categorie:categorie[4],
            media:media[29]
        }, {
            categorie:categorie[5],
            media:media[5]
        }, {
            categorie:categorie[5],
            media:media[6]
        }, {
            categorie:categorie[5],
            media:media[21]
        },, {
            categorie:categorie[5],
            media:media[25]
        }, {
            categorie:categorie[6],
            media:media[10]
        }, {
            categorie:categorie[6],
            media:media[30]
        }, {
            categorie:categorie[7],
            media:media[8]
        }, {
            categorie:categorie[7],
            media:media[9]
        }, {
            categorie:categorie[7],
            media:media[31]
        }, {
            categorie:categorie[8],
            media:media[3]
        }, {
            categorie:categorie[8],
            media:media[4]
        }, {
            categorie:categorie[10],
            media:media[11]
        }, {
            categorie:categorie[10],
            media:media[12]
        }, {
            categorie:categorie[11],
            media:media[17]
        }, {
            categorie:categorie[11],
            media:media[28]
        }, {
            categorie:categorie[12],
            media:media[22]
        }, {
            categorie:categorie[12],
            media:media[1]
        }, {
            categorie:categorie[12],
            media:media[2]
        }, {
            categorie:categorie[14],
            media:media[16]
        }, {
            categorie:categorie[14],
            media:media[24]
        }, {
            categorie:categorie[13],
            media:media[23]
        }, {
            categorie:categorie[13],
            media:media[26]
        }];
    }
});