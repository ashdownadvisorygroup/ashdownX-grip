/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */
var mongoose     = require('mongoose');

var CategorieSchema   = new mongoose.Schema({
    nom: String,
    description: String,
    date: { type: Date, default: Date.now },
    medias: [{ type: mongoose.Schema.Types.Mixed, ref: 'Media' }],
    categorieprofil : [{type : mongoose.Schema.Types.ObjectId, ref : "CategorieProfil"}],
    categoriemedia:[{ type: mongoose.Schema.Types.Mixed, ref: 'CategorieMedia' }]
});

mongoose.model('Categorie', CategorieSchema);
