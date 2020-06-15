var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    name: String,
    content: String,
    file: String,
    seen: Number,
    like : Number,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
        default: []
    }],
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'topic'
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    modifyAt: {
        type: Date,
        default: Date.now
    }
});

let POST_COLL  = mongoose.model('post',postSchema);
module.exports = POST_COLL;