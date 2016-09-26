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
            description:"admin"
        }, {
            nom: "stagiaire",
            description:"stagiaire"

        }, {
            nom: "superadmin",
            description:"superadmin"

        }, {
            nom: "encadreur",
            description:"encadreur"

        }];
    }
});