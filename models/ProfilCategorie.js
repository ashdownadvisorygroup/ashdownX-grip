/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
var mongoose     = require('mongoose');

var MediaProfilSchema   = new mongoose.Schema({
    rang: String,
    progression:String,
    categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' },
    profil:{ type: mongoose.Schema.Types.ObjectId, ref: 'Profil' }
});//permet de savoir le rang d'un media appartenant à un profil donné

mongoose.model('CategorieProfil', MediaProfilSchema);