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
            progression: "100",
            profil:profil[0],
            user:user[0]
        },{
            progression: "100",
            profil:profil[0],
            user:user[6]
        }, {
            progression: "0",
            profil:profil[2],
            user:user[3]

        } ,{
            progression: "0",
            profil:profil[2],
            user:user[3]
        }, {
            progression: "6",
            profil:profil[3],
            user:user[0]

        }, {
            progression: "100",
            profil:profil[2],
            user:user[4]

        }, {
            progression: "100",
            profil:profil[2],
            user:user[1]

        }, {
            progression: "100",
            profil:profil[2],
            user:user[3]

        }, {
            progression: "6",
            profil:profil[3],
            user:user[3]
        }, {
            progression: "0",
            profil:profil[1],
            user:user[11],
            encadre:"true"
        }, {
            progression: "0",
            profil:profil[2],
            user:user[11],
            encadre:"true"
        }, {
            progression: "0",
            profil:profil[3],
            user:user[11],
            encadre:"true"
        }, {
            progression: "0",
            profil:profil[0],
            user:user[12],
            encadre:"true"
        }, {
            progression: "0",
            profil:profil[4],
            user:user[12],
            encadre:"true"
        }, {
            progression: "0",
            profil:profil[3],
            user:user[13],
            encadre:"true"

        }, {
            progression: "6",
            profil:profil[2],
            user:user[13],
            encadre:"true"
        }];
    }
});