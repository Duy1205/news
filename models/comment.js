const ObjectID = require('mongoose').Types.ObjectId;
const POST_COLL = require('../database/post-coll');
const COMMENT_COLL = require('../database/comment-coll');
const USER_COLL = require('../database/user-coll');
// const TOPIC_COLL = require('../database/topic-coll');

module.exports = class Comment extends COMMENT_COLL {

    static insert({author, content, postID}) {
        return new Promise(async resolve => {
            try {

                if (!content || !ObjectID.isValid(postID, author))
                return resolve({ error: true, message: 'params_invalid' });

                let dataInsert = { 
                    content,
                    author,
                    post: postID
                };

                console.log({ dataInsert })
                

                let infoAfterInsert = new COMMENT_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_comment' });

                let {_id: commentID} =  saveDataInsert;
                // console.log(commentID);
                // console.log(post);
                

                let PostAfterUpdate = await POST_COLL.findByIdAndUpdate(postID, {
                    $addToSet:{
                        comments: infoAfterInsert._id
                    }
                }, {new: true})

                if( !PostAfterUpdate ){
                    return resolve({error: true, message:'cannot_update_post'})
                }

                resolve({ error: false, data: infoAfterInsert });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listComment = await COMMENT_COLL.find().sort({ createAt: -1 });
                // console.log({listComment});
                
                if (!listComment) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listComment });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ commentID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(commentID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoComment = await COMMENT_COLL.findById(commentID)

                if (!infoComment) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoComment });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ commentID, postID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(commentID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await COMMENT_COLL.findByIdAndDelete({ commentID, postID });

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                let removeCommentToPost = await COMMENT_COLL.findByIdAndUpdate(postID, {
                    $pull: { comments: commentID }
                }, {new: true})

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ commentID,content }) {
        return new Promise(async resolve => {
            try {


                if (!ObjectID.isValid(commentID) ) //|| !ObjectID.isValid(userUpdate)
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    content,
                }
                
                let infoAfterUpdate = await COMMENT_COLL.findByIdAndUpdate(commentID, dataUpdate, { new: true });
                
                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'cannot_update_data' });

                return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });

                
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}
