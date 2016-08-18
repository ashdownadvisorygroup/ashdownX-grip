/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Group = mongoose.model('Group');
var Profil = mongoose.model('Profil');
addSeed(User, {
    dependencies: [Profil,Group],
    seed: function (profil,groups) {
        return [{
            name: "admin",
            password:"admin",
            groups:[groups[0]],
            profil:[profil[2]]
        }, {
            name: "user",
            password:"user",
            groups:[groups[1]],
            profil:[profil[1]]
        }, {
            name: "adminUser",
            password:"adminUser",
            groups:[groups[0],groups[1]],
            profil:[profil[2],profil[4]]


        }, {
            name: "user1",
            password:"user1",
            groups:[groups[0]],
            profil:[profil[2]]
        }, {
            name: "user2",
            password:"user2",
            groups:[groups[0]],
            profil:[profil[0]]
        }, {
            name: "user3",
            password:"user3",
            groups:[groups[0]],
            profil:[profil[0],profil[1]]

        }];
    }
});