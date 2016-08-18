/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */
var mongoose     = require('mongoose');

var CategorieSchema   = new mongoose.Schema({
    nom: String,
    description: String,
    medias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }]
});

mongoose.model('Categorie', CategorieSchema);
