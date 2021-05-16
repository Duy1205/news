const ObjectID = require('mongoose').Types.ObjectId;
const POST_COLL = require('../database/post-coll');
const TOPIC_COLL = require('../database/topic-coll');
const COMMENT_COLL =  require('../database/comment-coll');
const USER_COLL = require('../database/user-coll');

module.exports = class Post extends POST_COLL {

    static insert({ name, content, topic, author, avatar}) {
        return new Promise(async resolve => {
            try {

                if (!name)
                return resolve({ error: true, message: 'params_invalid' });

                let dataInsert = { 
                    name,
                    content,
                    topic,
                    author,
                    avatar
                };
                

                let infoAfterInsert = new POST_COLL(dataInsert);
                console.log({ infoAfterInsert })
                let saveDataInsert = await infoAfterInsert.save();

                if (!saveDataInsert) return resolve({ error: true, message: 'cannot_insert_post' });


                let topicAfterUpdate = await TOPIC_COLL.findByIdAndUpdate(topic, {
                    $addToSet:{
                        posts: infoAfterInsert._id
                    } 
                })

                let authorAfterUpdate = await USER_COLL.findByIdAndUpdate(author, {
                    $addToSet:{
                        posts: infoAfterInsert._id
                    } 
                })

                if( !topicAfterUpdate || !authorAfterUpdate ){
                    return resolve({error: true, message:'cannot_update_topic'})
                }

                resolve({ error: false, data: infoAfterInsert });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        });
    }

    static searchPost({ key }){
        return new Promise(async (resolve) => {
            try {
             
                let resultSearch = await POST_COLL.find({
                    $or: [
                        { name: new RegExp(key, 'i')  },
                    ]
                })

                return resolve({ error: false, data: resultSearch });
            } catch (error) {
                return resolve({ error: true, message: error.message })
            }
        })
    }

    static getList() {
        return new Promise(async resolve => {
            try {
                let listPost = await POST_COLL.find({})
                .populate('topic')
                .populate('user')
                .sort({ createAt: -1 })
                .sort({seen : -1})

                // console.log(listPost);
                
                
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

    //getListPost TOP 5
    static getListPostTop5() {
        return new Promise(async resolve => {
            try {
                let listPostTop5 = await POST_COLL.find({})
                .populate('topic')
                .populate('user')
                .limit(5)
                .sort({seen: -1})
                // console.log({listPostTop5})
                
                if (!listPostTop5) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listPostTop5 });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }


    static listTopView(){
        return new Promise(async resolve => {
            try {
                let listTopView = await POST_COLL.find({})
                .sort({seen : -1})

                if(!listTopView) return resolve({ error : true, message : 'cannot_get_data'});

                return resolve({ error : false, data : listTopView})
            } catch (error) {
                return resolve({ error : true, message : error.message});
            }
        })
    }

    static listSpecialPost(){
        return new Promise(async resolve => {
            try {
                let listSpecialPost = await POST_COLL.find({})
                .sort({like : -1})

                if(!listSpecialPost) return resolve({error : true, message : 'cannot)get_data'})
                return resolve({error : false, data : listSpecialPost})
            } catch (error) {
                return resolve({error : true, message : error.message});
            }
        })
    }

    static listCmtPost(){
        return new Promise(async resolve => {
            try {
                let listCmtPost = await POST_COLL.find({})
                .sort({comments : -1})

                if(!listCmtPost) return resolve({error : true, message : 'cannot)get_data'})
                return resolve({error : false, data : listCmtPost})
            } catch (error) {
                return resolve({error : true, message : error.message});
            }
        })
    }

    static getInfo({ postID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(postID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoPost = await  POST_COLL.findById(postID)
                .populate('comments')
                .populate('topic')
                .populate('author')
                .sort({createAt : -1})

                if (!infoPost) return resolve({ error: true, message: 'cannot_get_info_data' });

                return resolve({ error: false, data: infoPost });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getInfo({ postID, userID }) {
        return new Promise(async resolve => {
            try {
                
                if (!ObjectID.isValid(postID, userID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoPost = await POST_COLL.findById(postID)
                .populate('subject post user')

                if (!infoPost) return resolve({ error: true, message: 'cannot_get_info_data' });

                let seenOfPost = await POST_COLL.findByIdAndUpdate(postID, {
                    $push: { seen: userID }
                }, {new: true})

                return resolve({ error: false, data: infoPost });

            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ postID, topicID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(postID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await POST_COLL.findByIdAndDelete(postID);

                let infoCmtRemove   = await COMMENT_COLL.deleteMany({ post : postID});

                if (!infoAfterRemove || !infoCmtRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                let removePostToTopic  = await TOPIC_COLL.findByIdAndUpdate(topicID, {
                    $pull : {
                        posts : postID
                    }
                }, {new : true})

                if(!removePostToTopic) return resolve({error : true, message :'cannot_remove_post_to_topic'})

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static update({ postID,topic, name, content}) {
        return new Promise(async resolve => {
            try {


                if (!ObjectID.isValid(postID) ) //|| !ObjectID.isValid(userUpdate)
                    return resolve({ error: true, message: 'params_invalid' });

                let dataUpdate = {
                    topic,
                    name,
                    content
                    
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

    //Thích bài viết
    static likePost({ postID, userID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(postID, userID))
                    return resolve({ error: true, message: 'params_invalid' });

                let likeOfPost = await POST_COLL.findByIdAndUpdate(postID, {
                    $addToSet: { like: userID }
                }, {new: true})

                if (!likeOfPost) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: likeOfPost });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    //Bỏ thích bài viết
    static unLikePost({ postID, userID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(postID, userID))
                    return resolve({ error: true, message: 'params_invalid' });
                    
                let unLikeOfPost = await POST_COLL.findByIdAndUpdate(postID, {
                    $pull: { like: userID }
                }, {new: true})

                if (!unLikeOfPost) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: unLikeOfPost });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

}
