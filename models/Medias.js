/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */

var mongoose     = require('mongoose');
var MediaSchema   = new mongoose.Schema({
    nom: String,
    logo: String,
    description: String,
    link: String,
    readed: {type: Number, default: 0},
    downloaded: {type: Number, default: 0},
    categorie : {type : mongoose.Schema.Types.ObjectId, ref : "Categorie"},
    mediaprofil : [{type : mongoose.Schema.Types.ObjectId, ref : "MediaProfil"}],
    mediauser : [{type : mongoose.Schema.Types.ObjectId, ref : "MediaUser"}]
});

MediaSchema.methods.download = function(cb) {
    this.downloaded += 1;
    this.save(cb);
};

MediaSchema.methods.read = function(cb) {
    this.readed += 1;
    this.save(cb);
};


mongoose.model('Media', MediaSchema);
