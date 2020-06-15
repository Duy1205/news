var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    
    content: String,
    createAt: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    }
    
});

let COMMENT_COLL = mongoose.model('comment', commentSchema);
module.exports  = COMMENT_COLL ;
