const route = require('express').Router();
const jwt       = require('../utils/jwt');
const POST_MODEL  = require('../models/post');
const TOPIC_MODEL = require('../models/topic');
const COMMENT_MODEL = require('../models/comment');
const { renderToView } = require('../utils/childRouting');
const { uploadMulter } = require('../utils/config-multer');
const { CF_ROUTINGS } = require('../constant/core/base_api');


route.get(CF_ROUTINGS.LIST_POST, async (req, res) => {
    let listPost = await POST_MODEL.getList();
    
    res.json({listPost});
})

route.get(CF_ROUTINGS.RECENT_POST, async ( req, res) => {
    let infoPost = await POST_MODEL.getList({ })


    renderToView(req, res, 'pages/recentpost', { infoPost: infoPost.data})

})


route.get(CF_ROUTINGS.EDIT_POST, async (req, res) => {

    let {postID} = req.params;
    
    let infoPost = await POST_MODEL.getInfo({ postID });
    
    renderToView(req, res, 'pages/edit-post', {infoPost : infoPost.data});
    console.log({infoPost});
    
});

route.get(CF_ROUTINGS.ADD_POST, (req, res) => {
    renderToView(req, res, 'pages/add-post', {});
});

route.post(CF_ROUTINGS.ADD_POST,uploadMulter.single('avatar') ,async (req , res) => {

    let {name, content, topic, author } = req.body;

    let infoFile = req.file;
    
    let infoPost = await POST_MODEL.insert({ name, content, topic, author, avatar: infoFile.originalname });
    
    res.json({infoPost});
})

route.get(CF_ROUTINGS.INFO_POST, async (req, res) => {
    let { postID } = req.query;
    let infoPost = await POST_MODEL.getInfo({ postID })

    renderToView(req, res, 'pages/post-detail', { infoPost: infoPost.data})

})

route.get(CF_ROUTINGS.INFO_HOT_POST, async (req, res) => {
    let { postID } = req.query;
    let infoPost = await POST_MODEL.getInfo({ postID })

    renderToView(req, res, 'pages/hot-detail', { infoPost: infoPost.data})


})

route.post(CF_ROUTINGS.UPDATE_POST, async (req, res) => {
        let {postID} = req.params;
        
        let { topic,name,content} = req.body;
        
        let infoPost = await POST_MODEL.update({postID, topic, name, content});
        
        res.json({infoPost});
    
})

route.post(CF_ROUTINGS.REMOVE_POST, async (req, res) => {
    let {postID, topicID} = req.query;

    let infoPost = await POST_MODEL.remove({postID, topicID});

    res.json({infoPost});
})

route.get(CF_ROUTINGS.LIKE_POST, async (req, res) => {
    let { token } = req.session;
    let infoUser = await jwt.verify(token) ;
    console.log({infoUser});

    let { postID } = req.query;
    console.log({postID});

    let infoPostAfterUpdate = await POST_MODEL.likePost({ postID, userID: infoUser.data._id })
    
    console.log({infoPostAfterUpdate});
    

    res.json(infoPostAfterUpdate)
})

route.get(CF_ROUTINGS.UNLIKE_POST, async (req, res) => {
    let { token } = req.session;
    let infoUser = await jwt.verify(token);
    let { postID } = req.query;
    let infoPostAfterUpdate = await POST_MODEL.unLikePost({ postID, userID: infoUser.data._id })
    res.json(infoPostAfterUpdate)
})

module.exports = route;