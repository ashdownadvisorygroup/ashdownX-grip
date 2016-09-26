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
            master:[profil[4],profil[0]],
            encadreur:[profil[4],profil[0],profil[1]],
            email:"o@gmail.com"
        }, {
            name: "user",
            password:"user",
            groups:[groups[1]],
            profil:[profil[2],profil[0],profil[4],profil[1]],
            master:[profil[3]],
            email:"user@gmail.com",
            photo:"data/photos/photo5.png"
        }, {
            name: "adminUser",
            password:"adminUser",
            groups:[groups[0],groups[1]],
            profil:[profil[1]],
            encadreur:[profil[4],profil[0],profil[2]],
            master:[profil[0]],
            email:"a@gmail.com"


        }, {
            name: "user1",
            password:"user1",
            groups:[groups[0]],
            profil:[profil[2]],
            email:"e@gmail.com"
        }, {
            name: "user2",
            password:"user2",
            groups:[groups[0]],
            profil:[profil[0]],
            email:"y@gmail.com"
        }, {
            name: "user3",
            password:"user3",
            groups:[groups[1]],
            profil:[profil[0],profil[1]],
            email:"z@gmail.com"

        }, {
            name: "master",
            password:"master",
            groups:[groups[2]],
            profil:[profil[0],profil[1],profil[2]],
            encadreur:[profil[4]],
            email:"xtz@gmail.com"

        }, {
            name: "user4",
            password:"user4",
            groups:[groups[0]],
            profil:[profil[0],profil[1]],
            email:"oooo@gmail.com",
            photo:"data/photos/dos.png"

        }, {
            name: "user5",
            password:"user5",
            groups:[groups[1]],
            profil:[profil[0],profil[1]],
            email:"nphoeb@gmail.com",
            photo:"data/photos/photo0.png"

        }, {
            name: "user11",
            password:"user11",
            groups:[groups[0]],
            profil:[profil[0],profil[1]],
            email:"user11@gmail.com",
            photo:"data/photos/photo0.png"

        }, {
            name: "user10",
            password:"user10",
            groups:[groups[1]],
            profil:[profil[0],profil[1]],
            email:"user10@gmail.com",
            photo:"data/photos/photo0.png"

        }, {
            name: "user9",
            password:"user9",
            groups:[groups[2]],
            profil:[profil[0],profil[1]],
            email:"user9@gmail.com",
            photo:"data/photos/photo0.png"

        }, {
            name: "user8",
            password:"user8",
            groups:[groups[2]],
            profil:[profil[0],profil[1]],
            email:"user8@gmail.com",
            photo:"data/photos/photo0.png"

        }, {
            name: "user7",
            password:"user7",
            groups:[groups[1]],
            profil:[profil[0],profil[1]],
            email:"user7@gmail.com",
            photo:"data/photos/photo0.png"

        }, {
            name: "user12",
            password:"user12",
            groups:[groups[0]],
            profil:[profil[0],profil[1]],
            email:"user12@gmail.com",
            photo:"data/photos/photo0.png"

        }, {
            name: "user6",
            password:"user6",
            groups:[groups[1]],
            profil:[profil[0],profil[1]],
            email:"user6@gmail.com",
            photo:"data/photos/photo0.png"

        }];
    }
});