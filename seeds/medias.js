/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var Media = mongoose.model('Media');
var Categorie = mongoose.model('Categorie');
addSeed(Media, {
    dependencies: [Categorie],
    seed: function (categorie) {

        return [{
            nom: "livre1",
            logo: "../Documents/4 gtel/formations/FJV/FichiersDeTravail/Photos/carte10.png",
            description: "c'est le livre 1",
            link: "../Documents/4 gtel/formations/FJV/FichiersDeTravail/Photos/DEVOIR.pdf",
            readed: "0",
            downloaded: "0",
            categorie : categorie[1]
        }, {
            nom: "livre2",
            logo: "../Documents/4 gtel/formations/FJV/FichiersDeTravail/Photos/carte11.png",
            description: "c'est le livre 2",
            link: "../Documents/4 gtel/formations/FJV/FichiersDeTravail/Photos/ANTENNES A LARGE BANDE.pdf",
            readed: "0",
            downloaded: "0",
            categorie : categorie[3]

        }, {
            nom: "livre3",
            logo:"../Documents/4 gtel/formations/FJV/FichiersDeTravail/Photos/carte16.png",
            description: "c'est le livre 3",
            link: "https://www.youtube.com/watch?v=bPeGftH2ftk",
            readed: "0",
            downloaded: "0",
            categorie : categorie[0]

        }, {
            nom: "livre4",
            logo: "../Documents/4 gtel/formations/FJV/FichiersDeTravail/Photos/carte0.png",
            description: "c'est le livre 4",
            link: "https://www.youtube.com/watch?v=bPeGftH2ftk",
            readed: "0",
            downloaded: "0",
            categorie : categorie[4]

        }, {
            nom: "livre5",
            logo: "../Documents/4 gtel/formations/FJV/FichiersDeTravail/Photos/carte9.png",
            description: "c'est le livre 5",
            link: "../Documents/4 gtel/formations/FJV/FichiersDeTravail/Photos/ANTENNES A LARGE BANDE.pdf",
            readed: "0",
            downloaded: "0",
            categorie : categorie[5]

        }];
    }
});