/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var MediaUser = mongoose.model('MediaUser');
var User = mongoose.model('User');
var Media = mongoose.model('Media');
addSeed(MediaUser, {
    dependencies: [Media,User],
    seed: function (media,user) {
        return [];
    }
});