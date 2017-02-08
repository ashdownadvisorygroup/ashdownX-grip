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
            media:media[0],
            categorie:categorie[0]
        }, {
            media:media[1],
            categorie:categorie[1]

        } ,{
            media:media[2],
            categorie:categorie[2]
        }, {
            media:media[3],
            categorie:categorie[3]

        }, {
            media:media[3],
            categorie:categorie[4]

        }, {

            media:media[4],
            categorie:categorie[5]

        },{
            media:media[5],
            categorie:categorie[0]
        }, {
            media:media[6],
            categorie:categorie[1]

        } ,{
            media:media[7],
            categorie:categorie[2]
        }, {
            media:media[8],
            categorie:categorie[3]

        }, {
            media:media[9],
            categorie:categorie[4]

        }, {

            media:media[10],
            categorie:categorie[5]

        }];
    }
});