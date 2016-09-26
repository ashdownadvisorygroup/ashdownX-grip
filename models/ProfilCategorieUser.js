/**
 * Created by NOUBISSI TAPAH PHOEB on 09/09/2016.
 */
var mongoose     = require('mongoose');

var ProfilCatUserSchema   = new mongoose.Schema({
    etat:String,
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    profil:{ type: mongoose.Schema.Types.ObjectId, ref: 'Profil' },
    categorie:{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }
});//permet de savoir le rang d'un media appartenant à un profil donné

mongoose.model('ProfilCatUser', ProfilCatUserSchema);