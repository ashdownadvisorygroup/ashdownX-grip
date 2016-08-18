/**
 * Created by NOUBISSI TAPAH PHOEB on 31/07/2016.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //photo: String,
    //roles:[{type : mongoose.Schema.Types.ObjectId, ref : "Role"}],
    groups:[{type : mongoose.Schema.Types.ObjectId, ref : "Group"}],
    profil:[{type : mongoose.Schema.Types.ObjectId, ref : "Profil"}],
    mediauser:[{ type: mongoose.Schema.Types.ObjectId, ref: 'MediaUser' }]

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

