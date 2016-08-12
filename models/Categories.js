/**
 * Created by NOUBISSI TAPAH PHOEB on 26/07/2016.
 */
var mongoose     = require('mongoose');

var CategorieSchema   = new mongoose.Schema({
    nom: String,
    description: String,
    livres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Livre' }]
});

mongoose.model('Categorie', CategorieSchema);
