const ObjectID = require('mongoose').Types.ObjectId;
const POST_COLL = require('../database/post-coll');
const TOPIC_COLL = require('../database/topic-coll');
const COMMENT_COLL =  require('../database/comment-coll');

module.exports = class Post extends POST_COLL {

    static insert({ name, content, topic, comment}) {
        return new Promise(async resolve => {
            try {

                if (!name) // !ObjectID.isValid(authorID)
                return resolve({ error: true, message: 'params_invalid' });

                let dataInsert = { 
                    name,
                    content,
                   //file,
                    //author: authorID,
                    topic,
                    comment
                };
                

                let infoAfterInsert = new POST_COLL(dataInsert);
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_post' });

                let {_id: postID} =  saveDataInsert;

                let topicAfterUpdate = await TOPIC_COLL.findByIdAndUpdate(topic, {
                    $addToSet:{
                        posts: postID
                    } 
                })

                if( !topicAfterUpdate ){
                    return resolve({error: true, message:'cannot_update_topic'})
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
                let listPost = await POST_COLL.find({}).sort({ createAt: -1 });
                
                if (!listPost) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listPost });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }

            // try {
            //     let listComment = await COMMENT_COLL.find({}).populate('comments').sort({ createAt: -1 });

            //     if (!listComment) return resolve({ error: true, message: 'cannot_get_list_data' });

            //     return resolve({ error: false, data: listComment });

            // } catch (error) {

            //     return resolve({ error: true, message: error.message });
            // }
        })
    }

    static getInfo({ postID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(postID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoPost = await  POST_COLL.findById(postID)
                .populate('comments');

                console.log({infoPost});
                
                if (!infoPost) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoPost });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ postID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(postID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await POST_COLL.findByIdAndDelete(postID);

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ postID, name, conten, comment }) {
        return new Promise(async resolve => {
            try {


                if (!ObjectID.isValid(postID) ) //|| !ObjectID.isValid(userUpdate)
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    name,
                    content,
                    comment
                    // file,
                    // userUpdate, 
                    // modifyAt: Date.now()
                }
                
                let infoAfterUpdate = await POST_COLL.findByIdAndUpdate(postID, dataUpdate, { new: true });
                
                if (!infoAfterUpdate)
                    return resolve({ error: true, message: 'cannot_update_data' });

                return resolve({ error: false, data: infoAfterUpdate, message: "update_data_success" });

                
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}
