/**
 * Created by NOUBISSI TAPAH PHOEB on 08/09/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var UserProfil = mongoose.model('UserProfil');
var User = mongoose.model('User');
var Profil = mongoose.model('Profil');
addSeed(UserProfil, {
    dependencies: [Profil,User],
    seed: function (profil,user) {
        return [];
    }
});