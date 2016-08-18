/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */

var mongoose = require('mongoose');

const addSeed = require('mongoose-plugin-seed').addSeed;



var Categorie = mongoose.model('Categorie');
addSeed(Categorie, {

    seed: function () {
        return [{
            nom: "musique",
            description:"musique et musique"
        }, {
            nom: "art",
            description:"art et art"

        }, {
            nom: "roman",
            description:"roman et roman"

        }, {
            nom: "undefined",
            description:"undefined et undefined"

        }, {
            nom: "dramatique",
            description:"dramatique et dramatique"

        }];
    }
});
