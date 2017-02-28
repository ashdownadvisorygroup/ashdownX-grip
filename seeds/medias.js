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
            nom: "Média_html",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 1 programmation en langage NodeJs",
            link: "data/pdfs/13666-apprenez-a-creer-votre-site-web-avec-html5-et-css3.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"
        },{
            nom: "Média_MongodB2",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 1 programmation en langage NodeJs",
            link: "data/pdfs/MongoDB-and-Mongoose-in-NodeJS.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"
        },{
            nom: "Média_MongodB3",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 1 programmation en langage NodeJs",
            link: "data/pdfs/mongodb_tutorial.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ac"
        },{
            nom: "Média_Migration2",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 1 programmation en langage NodeJs",
            link: "data/pdfs/migration.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ac"
        },{
            nom: "Média_Migration3",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 1 programmation en langage NodeJs",
            link: "data/pdfs/migration2.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ac"
        }, {
            nom: "Média_Laravel2",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/laravel_tutorial.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_Laravel3",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/laravel-testing-decoded-by-jeffrey-way.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ac"

        }, {
            nom: "Média_Git2",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/Git.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_Git3",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/tutoriel-git",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ac"

        }, {
            nom: "Média_JQuery2",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/jquery_tutorial.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ac"

        }, {
            nom: "Média_jQuery3",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/jQuery-Cours1-2015.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_Javascript2",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/javascript_tutorial.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_Bootstrap2",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/bootstrap_tutorial.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_Bootstrap3",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/Bootstrap-tutorial.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ac"

        }, {
            nom: "Média_Angular2",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/angular2.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_Angular3",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/angularjs_bon.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_Angular4",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/angularJS_nodeJS_mongoDB.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ac"

        }, {
            nom: "Média_ionic",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/125_AngularJS_and_Ionic.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_php2",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/apis-php-en.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_unit_test2",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/unittesting.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_test_nodejs",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/jasminejs_tutorial.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_unit_Laravel",
            logo: "data/logos/pdf.jpg",
            description: "c'est le livre 2 livre de programmation web débutants",
            link: "data/pdfs/laravel-testing-decoded-by-jeffrey-way.pdf",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_Angularjs1",
            logo:"data/logos/youtube.png",
            description: "Prise en main d'angularjs",
            link: "https://www.youtube.com/watch?v=zKkUN-mJtPQ",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_Mongodb1",
            logo:"data/logos/youtube.png",
            description: "Prise en main de MongodB",
            link: "https://www.youtube.com/watch?v=pWbMrx5rVBE",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_Nodejs1",
            logo:"data/logos/youtube.png",
            description: "Prise en main de Nodejs",
            link: "https://www.youtube.com/watch?v=0xeNiFGtcSs",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_Ionic1",
            logo:"data/logos/youtube.png",
            description: "Prise en main d'Ionic",
            link: "https://www.youtube.com/watch?v=sCnGSOaaZFo",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_Laravel",
            logo:"data/logos/youtube.png",
            description: "Prise en main de Laravel",
            link: "https://www.youtube.com/watch?v=oc1_DHfL89k",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_uniTestNodejs",
            logo:"data/logos/youtube.png",
            description: "Tests unitaires avec nodejs",
            link: "https://www.youtube.com/watch?v=u2XCdkL4bWI",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_Git",
            logo:"data/logos/youtube.png",
            description: "prise en main de Git",
            link: "https://www.youtube.com/watch?v=5IcYILdejs8",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_php",
            logo:"data/logos/photo0.png",
            description: "c'est le livre 3 vidéo youtube",
            link: "https://www.youtube.com/watch?v=YjtjGaZtQCg",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_angularmaterial",
            logo:"data/logos/photo0.png",
            description: "c'est le livre 3 vidéo youtube",
            link: "https://www.youtube.com/watch?v=gOSdZJ7gpOc",

            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"aa"

        }, {
            nom: "Média_js1",
            logo:"data/logos/photo0.png",
            description: "c'est le livre 3 vidéo youtube",
            link: "https://www.youtube.com/watch?v=cQZOfeKrWDs",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_JQuery1",
            logo:"data/logos/photo0.png",
            description: "c'est le livre 3 vidéo youtube",
            link: "https://www.youtube.com/watch?v=N3ii2HxJAHo",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ag"

        }, {
            nom: "Média_angular_vid",
            logo: "data/logos/video.png",
            description: "c'est le livre 4",
            link: "data/videos/00-Formation AngularJS _ Introduction.mp4",
            rate:{
                //type: Number, default: 0,
                valeur: 0,//valeur moyenne de la notation du média
                nombre:  0//nombre de ceux qui ont déjà noté
            },
            readed: "0",
            downloaded: "0",
            type:"ac"

        }];
    }
});