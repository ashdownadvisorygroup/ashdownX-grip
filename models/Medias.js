/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */

var mongoose     = require('mongoose');
var MediaSchema   = new mongoose.Schema({
    nom: String,
    logo: String,
    description: String,
    link: String,
    date: { type: Date, default: Date.now },
    creator:{type : mongoose.Schema.Types.ObjectId, ref : "User"},
    rate:{type: Number, default: 0},
    readed: {type: Number, default: 0},
    downloaded: {type: Number, default: 0},
    mediauser : [{type : mongoose.Schema.Types.ObjectId, ref : "MediaUser"}],
    categoriemedia:[{ type: mongoose.Schema.Types.ObjectId, ref: 'CategorieMedia' }]
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

