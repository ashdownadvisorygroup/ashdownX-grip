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
        return [{
            progression: "1%",
            profil:profil[0],
            user:user[0]
        }, {
            progression: "0%",
            profil:profil[2],
            user:user[3]

        } ,{
            progression: "0%",
            profil:profil[2],
            user:user[3]
        }, {
            progression: "6",
            profil:profil[3],
            user:user[0]

        }, {
            progression: "6",
            profil:profil[2],
            user:user[4]

        }, {
            progression: "6",
            profil:profil[3],
            user:user[3]
        }];
    }
});