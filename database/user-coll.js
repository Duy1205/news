var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    email: { 
        type: String,
        required: true,
        trim: true
    },
    fullname: String,
    password: String,
    avatar: String,
    role: {
        type: Number,
        default: 0
    },
    author: {
        type: Schema.Types.ObjectId,
        ref : "user"
    },
    createAt: Date
});

let USER_COLL  = mongoose.model('user',userSchema);
module.exports = USER_COLL;