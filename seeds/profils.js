/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var Profil = mongoose.model('Profil');
addSeed(Profil, {
    seed: function () {

        return [{
            nom: "developpement web laravel",
            description: "developpement web laravel ",
            objectifs: "developper en laravelgrip grip"
        }, {
            nom: "developpement web mean",
            description: "developpement des applications web mean",
            objectifs: "developper meangrip developper les applicationsgrip application RESTgrip projet means(MongodB, Express and NodeJs)"
        }, {
            nom: "programmation orientee objet",
            description: "programmation orientee objet ",
            objectifs: "programmer en phpgrip programmer en laravelgripet programmer en javagrip programmer en toutgrip projet"
        }, {
            nom: "android",
            description: "programmation en langage android",
            objectifs: "maitriser les bases du langagegrip savoir utiliser android studiogrip faire un programme basicgrip cas pratique developper un projetandroid"
        }, {
            nom: "algorithmique",
            description: "savoir écrire des algorithmes pour résoudre des problèmes donnés",
            objectifs: "maitriser la structure d'un algorithmegrip les bouclesgrip Complexité algorithmiquegrip Approches pratiques"
        }];
    }
});