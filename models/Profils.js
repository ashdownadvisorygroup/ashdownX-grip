/**
 * Created by NOUBISSI TAPAH PHOEB on 16/08/2016.
 */

var mongoose  = require('mongoose');



var ProfilSchema   = new mongoose.Schema({
    nom: String,
    description: String,
    objectifs: String,
    date: { type: Date, default: Date.now },
    users:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    //user d'un profil donné
    userencadre:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],//tous les encadreurs d'un profil
    userprofil:[{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfil' }],
    categorieprofil:[{ type: mongoose.Schema.Types.ObjectId, ref: 'CategorieProfil' }]
    //contient le rang de la categorie ie son ordre d'apparition dans le profil
});
mongoose.model('Profil', ProfilSchema);





