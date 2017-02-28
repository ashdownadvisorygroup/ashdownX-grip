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
            description:"créer,structurer et modifier des pages Web",

        }, {
            nom: "Git",
            description:"comment créer son propre compte sur GIT et uploader le projet en ligne",


        }, {
            nom: "angularjs",
            description:"programmer en angularjs framework javascript",


        }, {
            nom: "test unitaire",
            description:"permettant de vérifier le bon fonctionnement d'une partie précise d'un " +
            "logiciel ou d'une portion d'un programme (appelée « unité » ou « module »)",


        }, {
            nom: "angular material",
            description:"amélioration du style grace au framework, design utilisé de google"

        }, {
            nom: "Framework Laravel",
            description:"fournit des fonctionnalités en termes de routage de requête, de mapping " +
            "objet-relationnel (un système baptisé Eloquent implémentant Active Record), d'authentification, de vue (avec Blade)" +
            ", de migration de base de données, de gestion des exceptions et de test unitaire"

        }, {
            nom: "Javascript",
            description:"utiliser un langage de script, JavaScript;Insertion de scripts dans une page Web "

        }, {
            nom: "JQuery",
            description:"Manipulation du DOM (HTML ou CSS),Gestion des évènements (clic, survol, soumettre un formulaire ...)" +
            "AJAX,Effet d'animation"

        }, {
            nom: "Migration",
            description:"permet le changement des systèmes ou applications informatiques ou à leur mise à niveau"

        }, {
            nom: "ui Bootstrap",
            description:"amélioration du style grace au framework, design utilisé de google"

        }, {
            nom: "Bootstrap",
            description:" collection d'outils utile à la création du design (graphisme, animation et interactions avec la page" +
            " dans le navigateur ... etc. ...) de sites et d'applications web"

        }, {
            nom: "PHP(Hypertext Preprocessor)",
            description:" langage de script côté serveur conçu principalement pour le développement web"

        } ,{
            nom: "MongodB",
            description:"  système de gestion de base de données orientée documents, répartissable sur un nombre " +
            "quelconque d'ordinateurs et ne nécessitant pas de schéma prédéfini des données."

        },{
            nom: "Nodejs",
            description:" plateforme logicielle libre et événementielle en JavaScript " +
            "orientée vers les applications réseau qui doivent pouvoir monter en charge."

        },{
            nom: "Ionic",
            description:" développer des applications mobiles hybrides rapidement et facilement. " +
            "Il s’appuie sur AngularJS pour la partie application web " +
            "du framework et sur Cordova  pour la partie construction des applications natives. "

        }, {
            nom: "par defaut",
            description:"par defaut",

        }];
    }
});
