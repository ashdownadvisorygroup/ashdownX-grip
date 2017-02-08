/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var Group = mongoose.model('Group');
addSeed(Group, {
    seed: function () {
        return [{
            nom: "admin",
            description:"c'est le groupe des administrateurs de la plateforme"
        }, {
            nom: "stagiaire",
            description:"le groupe des stagiaires"

        }, {
            nom: "superadmin",
            description:"superadmin"

        }];
    }
});