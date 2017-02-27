/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var Profil = mongoose.model('Profil');
addSeed(User, {
    dependencies: [Group,Profil],
    seed: function (groups,profil) {
        return [{
            name: "admin",
            password:"admin",
            groups:[groups[0]],
            master:[profil[1],profil[0]],
            encadreur:[profil[0],profil[1]],
            email:"o@gmail.com",
            photo:"data/photos/photo1.png"
        }];
    }
});