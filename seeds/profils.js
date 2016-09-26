/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
const addSeed = require('mongoose-plugin-seed').addSeed;
var mongoose = require('mongoose');
var Profil = mongoose.model('Profil');
addSeed(Profil, {
    seed: function () {

        return [{
            nom: "developpement web laravel",
            description: "developpement web laravel econdary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.",
            objectifs: "developper laravelgrip laravelgrip developpementgrip ah oui"
        }, {
            nom: "developpement web mean",
            description: "developpement web mean econdary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.",
            objectifs: "developper meangrip developper les applicationsgrip intéressantsgrip oui oui"
        }, {
            nom: "experts",
            description: "experts econdary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.",
            objectifs: "expertsgrip encore expertsgripet toujours expertsgrip ohhlqlqlqlqgrip oui oui"
        }, {
            nom: "android",
            description: "ohhhhh android econdary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.",
            objectifs: "androidgrip encore endroidgrip voilà ce que ca donnegrip toujoursgripandroid"
        }, {
            nom: "developpement ",
            description: "c'est un expert econdary line text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam massa quam.",
            objectifs: "expertgrip encore développemntgrip oui oiu grip développeur"
        }];
    }
});