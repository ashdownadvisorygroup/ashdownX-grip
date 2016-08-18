/**
 * Created by NOUBISSI TAPAH PHOEB on 12/08/2016.
 */
var mongoose = require('mongoose');

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var GroupSchema = new mongoose.Schema({
    nom: String,
    description: String,
    users:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    //roles:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});
mongoose.model('Group', GroupSchema);


