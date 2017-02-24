/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var Media = mongoose.model('Media');
var Categorie = mongoose.model('Categorie');
addSeed(Media, {
    seed: function () {

        return [{
            nom: "livre1",
            logo: "data/logos/photo0.png",
            description: "c'est le livre 1 programmation en langage NodeJs",
            link: "data/pdfs/Programmation.pdf",
            readed: "0",
            downloaded: "0",
            type:"ag"
        }, {
            nom: "livre2",
            logo: "data/logos/1469705001050-google.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/yogui-web-debutant.pdf",
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "livre3",
            logo:"data/logos/photo0.png",
            description: "c'est le livre 3 vidéo youtube",
            link: "https://www.youtube.com/watch?v=zKkUN-mJtPQ",
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "livre4",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 4",
            link: "data/videos/00-Formation AngularJS _ Introduction.mp4",
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "livre5",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 5",
            link: "data/videos/VIDEO1.mp4",
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "livre6",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 6",
            link: "data/pdfs/Programmation.pdf",
            readed: "0",
            downloaded: "0",
            type:"ac"

        }, {
            nom: "livre7",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 7",
            link: "data/pdfs/assembleur-intel-nasm.pdf",
            readed: "0",
            downloaded: "0",
            type:"ac"

        }, {
            nom: "livre8",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 8",
            link: "data/videos/00-Formation AngularJS _ Introduction.mp4",
            readed: "0",
            downloaded: "0",
            type:"ag"
            //categorie : categorie[5]

        }, {
            nom: "livre9",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 9",
            link: "https://www.youtube.com/watch?v=GJmFG4ffJZU",
            readed: "0",
            downloaded: "0",
            type:"ac"
            //categorie : categorie[5]

        }, {
            nom: "livre10",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 10",
            link: "data/videos/00-Formation AngularJS _ Introduction.mp4",
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "livre11",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 11",
            link: "data/pdfs/android-debuter.pdf",
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "livre12",
            logo: "data/logos/1469640726372-images.png",
            description: "c'est le livre 12 livre de programmation en angularjs",
            link: "data/videos/00-Formation AngularJS _ Introduction.mp4",
            readed: "0",
            downloaded: "0",
            type:"ag"

        }];
    }
});