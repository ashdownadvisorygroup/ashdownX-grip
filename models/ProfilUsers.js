/**
 * Created by NOUBISSI TAPAH PHOEB on 08/09/2016.
 */
var mongoose     = require('mongoose');

var UserProfilSchema   = new mongoose.Schema({
    progression: String,//permet de connaitre la progression d'un utilisateur dans un profil de formation
    encadre:String,//permet de savoir si l'utilisateur encadre le profil ou non
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    profil:{ type: mongoose.Schema.Types.ObjectId, ref: 'Profil' }
});//permet de savoir la progression d'un utilisateur dans un profil donne

mongoose.model('UserProfil', UserProfilSchema);