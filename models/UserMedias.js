/**
 * Created by NOUBISSI TAPAH PHOEB on 18/08/2016.
 */
var mongoose     = require('mongoose');

var MediaUserSchema   = new mongoose.Schema({
    progression: String,
    notation:{type: Number, default: 0},
    media: { type: mongoose.Schema.Types.ObjectId, ref: 'Media' },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});//permet de savoir le rang d'un media appartenant à un profil donné

mongoose.model('MediaUser', MediaUserSchema);