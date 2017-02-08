/**
 * Created by NOUBISSI TAPAH PHOEB on 31/07/2016.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
// set up a mongoose model
var UserSchema = new mongoose.Schema({
    name: {type: String,unique: true},
    password: {type: String,required: true},
    email: { type: String,unique: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    date: { type: Date, default: Date.now },
    photo: String,
    groups:[{type : mongoose.Schema.Types.ObjectId, ref : "Group"}],
    profil:[{type : mongoose.Schema.Types.ObjectId, ref : "Profil"}],
    mediauser:[{type: mongoose.Schema.Types.ObjectId, ref: 'MediaUser'}],
    master:[{type : mongoose.Schema.Types.ObjectId, ref : "Profil"}],
    encadreur:[{type : mongoose.Schema.Types.ObjectId, ref : "Profil"}]
    //ensemble des profils qu'il peut noter
    //celui qui supervise l'avancement d'un user dans un profil donne
    //celui qui est certifié dans un profil donné et est capable de certifier un utilisateur donné dans ce profil

});

 UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
UserSchema.methods.greet = function() {
    return 'Hello, ' + this.name;
};

mongoose.model('User', UserSchema);

