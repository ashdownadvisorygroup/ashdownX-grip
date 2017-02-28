/**
 * Created by NOUBISSI TAPAH PHOEB on 02/09/2016.
 */
var mongoose  = require('mongoose');

var CategorieMediaSchema   = new mongoose.Schema({
    categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' },
    media:{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }
});//permet de savoir le rang d'un media appartenant à un profil donné

mongoose.model('CategorieMedia', CategorieMediaSchema);