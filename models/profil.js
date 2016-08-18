/**
 * Created by NOUBISSI TAPAH PHOEB on 16/08/2016.
 */

var mongoose  = require('mongoose');



var ProfilSchema   = new mongoose.Schema({
    nom: String,
    description: String,
    objectifs: String,
    users:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    mediaprofil:[{ type: mongoose.Schema.Types.ObjectId, ref: 'MediaProfil' }]
});
mongoose.model('Profil', ProfilSchema);





