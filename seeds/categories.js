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

        return [{
            nom: "musique",
            description:"musique et musique",
            medias:[medias[0],medias[1],medias[3],medias[5]]
        }, {
            nom: "art",
            description:"art et art",
            medias:[medias[1],medias[2],medias[3],medias[8],medias[9]]

        }, {
            nom: "roman",
            description:"roman et roman",
            medias:[medias[0],medias[3],medias[5],medias[8]]

        }, {
            nom: "undefined",
            description:"undefined et undefined",
            medias:[medias[3],medias[9],medias[5],medias[6]]

        }, {
            nom: "dramatique",
            description:"dramatique et dramatique",
            medias:[medias[4],medias[0],medias[2],medias[8],medias[7]]

        }, {
            nom: "par defaut",
            description:"par defaut",
            medias:[]

        }];
    }
});
