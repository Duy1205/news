var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
    
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'post',
        default: []
    }],
    name: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    modifyAt: {
        type: Date,
        default: Date.now()
    }
});

let TOPIC_COLL =mongoose.model('topic', topicSchema);
module.exports  = TOPIC_COLL ;