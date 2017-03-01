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
            profil:[profil[2]],
            master:[profil[3],profil[0]],
            encadreur:[profil[3],profil[0],profil[1]],
            email:"admin@gmail.com",
            photo:"data/photos/photo1.png"
        }, {
            name: "Vanex Mbeunang",
            password:"vanex",
            groups:[groups[1]],
            profil:[profil[0],profil[1],profil[2]],
            email:"vanexmbeunang@gmail.com",
            photo:"data/photos/photo2.png"
        }, {
            name: "James Assiene",
            password:"james",
            groups:[groups[1]],
            profil:[profil[1],profil[3]],
            email:"assiene.james@gmail.com",
            photo:"data/photos/photo3.png"


        }, {
            name: "Arnaud Tchana",
            password:"arnaud",
            groups:[groups[0]],
            encadreur:[profil[1],profil[2]],
            master:[profil[0]],
            email:"arnaud@gmail.com",
            photo:"data/photos/photo5.png"
        }, {
            name: "Wilfried NDJATHE",
            password:"wilfried",
            groups:[groups[0]],
            encadreur:[profil[3],profil[1]],
            master:[profil[0],profil[1],profil[2]],
            email:"wilfried@gmail.com",
            photo:"data/photos/photo1.png"
        }];
    }
});