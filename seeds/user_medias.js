/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var MediaUser = mongoose.model('MediaUser');
var User = mongoose.model('User');
var Media = mongoose.model('Media');
addSeed(MediaUser, {
    dependencies: [User,Media],
    seed: function (media,user) {
        return [{
            progression: "1%",
            media:media[0],
            user:user[0]
        }, {
            progression: "2%",
            media:media[1],
            user:user[1]

        }, {
            progression: "0%",
            media:media[2],
            user:user[3]

        }, {
            progression: "0%",
            media:media[3],
            user:user[1]

        }, {
            progression: "0%",
            media:media[4],
            user:user[3]
        }, {
            progression: "6",
            media:media[6],
            user:user[0]

        }, {
            progression: "6",
            media:media[9],
            user:user[1]

        }, {
            progression: "6",
            media:media[13],
            user:user[3]

        }];
    }
});