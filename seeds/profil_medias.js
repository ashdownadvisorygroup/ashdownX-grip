/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var MediaProfil = mongoose.model('MediaProfil');
var Profil = mongoose.model('Profil');
var Media = mongoose.model('Media');
addSeed(MediaProfil, {
    dependencies: [Profil,Media],
    seed: function (media,profil) {
        return [{
            rang: "1",
            media:media[0],
            profil:profil[0]
        }, {
            rang: "2",
            media:media[1],
            profil:profil[0]

        }, {
            rang: "3",
            media:media[2],
            profil:profil[1]

        }, {
            rang: "4",
            media:media[3],
            profil:profil[0]

        }, {
            rang: "5",
            media:media[4],
            profil:profil[3]

        }, {
            rang: "6",
            media:media[6],
            profil:profil[0]

        }, {
            rang: "6",
            media:media[9],
            profil:profil[1]

        }, {
            rang: "6",
            media:media[13],
            profil:profil[3]

        }];
    }
})