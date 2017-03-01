/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var Profil = mongoose.model('Profil');
addSeed(Profil, {
    seed: function () {
        return [{
            nom: "Développement Laravel",
            description: "Développement d'applications web avec le framework Laravel",
            objectifs: "Développer avec le framework Laravel"
        }, {
            nom: "Développement Mean",
            description: "Développement web avec la base de données Nosql MongodB",
            objectifs: "Construire des applications web avec le Framework Expressgrip" +
            "Utiliser la base de données MongoDB avec Node"
        }, {
            nom: "Android",
            description: "programmation d'applications Android",
            objectifs: "Maîtriser le langage le développement d'applications mobilesgrip " +
            "pratique developper un projet Android"
        }, {
            nom: "Programmation Web",
            description: "Programmation web",
            objectifs: "maitriser les bases de la programmation webgripcréer" +
            " des applications web et des sites de façon professionnelle"
        }];
    }
});