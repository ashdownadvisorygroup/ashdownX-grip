/**
 * Created by NOUBISSI TAPAH PHOEB on 08/09/2010.
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
            progression: "0",
            encadre:"true",
            user:user[0],
            profil:profil[0],
            master:"true"
        },{
            progression: "0",
            encadre:"true",
            user:user[0],
            profil:profil[1],
            master:"false"
        }, {
            progression: "0",
            encadre:"true",
            user:user[0],
            profil:profil[3],
            master:"true"
        } ,{
            progression: "0",
            encadre:"false",
            user:user[0],
            profil:profil[2],
            master:"false"
        }, {
            progression: "0",
            encadre:"false",
            user:user[1],
            profil:profil[0]
        }, {
            progression: "0",
            encadre:"false",
            user:user[1],
            profil:profil[1],
            master:"false"

        }, {
            progression: "0",
            encadre:"false",
            user:user[1],
            profil:profil[2],
            master:"false"

        }, {
            progression: "0",
            encadre:"false",
            user:user[2],
            profil:profil[1],
            master:"false"
        }, {
            progression: "0",
            encadre:"false",
            user:user[2],
            profil:profil[3],
            master:"false"
        }, {
            progression: "0",
            encadre:"true",
            user:user[3],
            profil:profil[1],
            master:"true"
        }, {
            progression: "0",
            encadre:"true",
            user:user[3],
            profil:profil[2],
            master:"true"
        }, {
            progression: "0",
            encadre:"true",
            user:user[4],
            profil:profil[3],
            master:"true"
        }, {
            progression: "0",
            encadre:"true",
            user:user[4],
            profil:profil[1],
            master:"true"
        }];
    }
});