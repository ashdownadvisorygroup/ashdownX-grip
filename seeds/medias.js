/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var Media = mongoose.model('Media');
var Categorie = mongoose.model('Categorie');
addSeed(Media, {
    //dependencies: [Categorie],
    seed: function () {

        return [{
            nom: "livre1",
            logo: "data/logos/photo0.png",
            description: "c'est le livre 1",
            link: "data/pdfs/1469707829354-DEVOIR.pdf",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[1]
        }, {
            nom: "livre2",
            logo: "data/logos/1469705001050-google.jpg",
            description: "c'est le livre 2",
            link: "data/pdfs/1469707829354-DEVOIR.pdf",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[3]

        }, {
            nom: "livre3",
            logo:"data/logos/photo0.png",
            description: "c'est le livre 3",
            link: "https://www.youtube.com/watch?v=bPeGftH2ftk",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[0]

        }, {
            nom: "livre4",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 4",
            link: "data/videos/VIDEO1.mp4",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[4]

        }, {
            nom: "livre5",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 5",
            link: "data/videos/VIDEO1.mp4",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[5]

        }, {
            nom: "livre6",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 6",
            link: "data/pdfs/1469707829354-DEVOIR.pdf",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[5]

        }, {
            nom: "livre7",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 7",
            link: "data/pdfs/1469707829354-DEVOIR.pdf",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[5]

        }, {
            nom: "livre8",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 8",
            link: "data/videos/VIDEO1.mp4",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[5]

        }, {
            nom: "livre9",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 9",
            link: "data/pdfs/1469707829354-DEVOIR.pdf",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[5]

        }, {
            nom: "livre10",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 10",
            link: "data/videos/VIDEO1.mp4",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[5]

        }, {
            nom: "livre11",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 11",
            link: "data/pdfs/1469707829354-DEVOIR.pdf",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[5]

        }, {
            nom: "livre12",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 12",
            link: "data/videos/VIDEO1.mp4",
            readed: "0",
            downloaded: "0"
            //categorie : categorie[5]

        }];
    }
});