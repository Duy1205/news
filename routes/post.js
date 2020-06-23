const route = require('express').Router();
const jwt       = require('../utils/jwt');
const POST_MODEL  = require('../models/post');
const TOPIC_MODEL = require('../models/topic');
const COMMENT_MODEL = require('../models/comment');
const { renderToView } = require('../utils/childRouting');

route.get('/listPost', async (req, res) => {
    let listPost = await POST_MODEL.getList();
    //console.log({listPost});
    
    res.json({listPost});
})

route.get('/edit-post/:postID', async (req, res) => {

    let {postID} = req.params;
    
    let infoPost = await POST_MODEL.getInfo({ postID });
    // console.log({infoPost});
    
    renderToView(req, res, 'pages/edit-post', {infoPost : infoPost.data});
    console.log({infoPost});
    
});

route.post('/add-post', async (req , res) => {
    let {name, content, topic, author } = req.body;
    //console.log({name, content, topic, comment});
    
    let infoPost = await POST_MODEL.insert({ name, content, topic, author });
    //console.log(infoPost);
    
    res.json({infoPost});
})

route.get('/info-post', async (req, res) => {
    let { postID } = req.query;
    let infoPost = await POST_MODEL.getInfo({ postID })

    renderToView(req, res, 'pages/post-detail', { infoPost: infoPost.data})

})

route.post('/update-post/:postID', async (req, res) => {
    let {postID} = req.params;
    //console.log({postID});
    
    let { topic,name,content} = req.body;
    
    let infoPost = await POST_MODEL.update({postID, topic, name, content});
    //console.log(infoPost);
    
    res.json({infoPost});
})

route.post('/remove-post/:postID', async (req, res) => {
    let {postID} = req.params;
    // console.log({postID});
    
    //let { name} = req.body;
    //console.log({name});
    
    let infoPost = await POST_MODEL.remove({postID});
    // console.log(infoPost);
    
    res.json({infoPost});
})

//Thích bài viết
route.post('/like-post/:postID', async (req, res) => {
    console.log("Da vao thich bai viet")
    let infoUser = req.session;
    let { postID } = req.params;
    let infoPostAfterUpdate = await POST_MODEL.likePost({ postID, userID: infoUser.user.infoUser._id })
    res.json(infoPostAfterUpdate)
})

//Bỏ thích bài viết
route.post('/un-like-post/:postID', async (req, res) => {
    console.log("Da vao thich bai viet")
    let infoUser = req.session;
    let { postID } = req.params;
    let infoPostAfterUpdate = await POST_MODEL.unLikePost({ postID, userID: infoUser.user.infoUser._id })
    res.json(infoPostAfterUpdate)
})

module.exports = route;