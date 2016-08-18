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
            description: "developpement web laravel",
            objectifs: "developper laravel"
            // users:users[0]
        }, {
            nom: "developpement web mean",
            description: "developpement web mean",
            objectifs: "developper mean"
            //users:users[1]
        }, {
            nom: "experts",
            description: "experts",
            objectifs: "experts"
            // users:users[0]
        }, {
            nom: "android",
            description: "ohhhhh android",
            objectifs: "android"
            // users:users[2]
        }, {
            nom: "expert",
            description: "c'est un expert",
            objectifs: "expert"
            // users:users[4]
        }];
    }
});