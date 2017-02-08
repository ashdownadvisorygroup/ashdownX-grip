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
            nom: "html et css",
            description:"les bases de l'html et des styles css",

        }, {
            nom: "Git",
            description:"comment créer son propre compte sur GIT et uploader le projet en ligne",


        }, {
            nom: "angularjs",
            description:"programmer en angularjs framework javascript",


        }, {
            nom: "test unitaire",
            description:"faire les tests unitaires de son programme",


        }, {
            nom: "angular material",
            description:"amélioration du style grace au framework, design utilisé de google"

        }, {
            nom: "par defaut",
            description:"par defaut",

        }];
    }
});
