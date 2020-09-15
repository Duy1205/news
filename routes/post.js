const route = require('express').Router();
const jwt       = require('../utils/jwt');
const POST_MODEL  = require('../models/post');
const TOPIC_MODEL = require('../models/topic');
const COMMENT_MODEL = require('../models/comment');
const { renderToView } = require('../utils/childRouting');
const { uploadMulter } = require('../utils/config-multer');

route.get('/listPost', async (req, res) => {
    let listPost = await POST_MODEL.getList();
    //console.log({listPost});
    
    res.json({listPost});
})

route.get('/postT6', async ( req, res) => {
    let infoPost = await POST_MODEL.getList({ })


    renderToView(req, res, 'pages/postT6', { infoPost: infoPost.data})

})

route.get('/postT7', async ( req, res) => {
    let infoPost = await POST_MODEL.getList({ })


    renderToView(req, res, 'pages/postT7', { infoPost: infoPost.data})

})

route.get('/recentpost', async ( req, res) => {
    let infoPost = await POST_MODEL.getList({ })


    renderToView(req, res, 'pages/recentpost', { infoPost: infoPost.data})

})


route.get('/edit-post/:postID', async (req, res) => {

    let {postID} = req.params;
    
    let infoPost = await POST_MODEL.getInfo({ postID });
    // console.log({infoPost});
    
    renderToView(req, res, 'pages/edit-post', {infoPost : infoPost.data});
    console.log({infoPost});
    
});

route.post('/add-post',uploadMulter.single('avatar') ,async (req , res) => {

    // Bên trong hàm .single() truyền vào name của thẻ input, ở đây là "file"
    
    let {name, content, topic, author } = req.body;

    let infoFile = req.file;
    
    let infoPost = await POST_MODEL.insert({ name, content, topic, author, avatar: infoFile.originalname });
    
    res.json({infoPost});
})

route.get('/info-post', async (req, res) => {
    let { postID } = req.query;
    let infoPost = await POST_MODEL.getInfo({ postID })

    renderToView(req, res, 'pages/post-detail', { infoPost: infoPost.data})

})

route.get('/info-hot', async (req, res) => {
    let { postID } = req.query;
    let infoPost = await POST_MODEL.getInfo({ postID })

    renderToView(req, res, 'pages/hot-detail', { infoPost: infoPost.data})


})


route.post('/update-post/:postID', async (req, res) => {
        let {postID} = req.params;
        //console.log({postID});
        
        let { topic,name,content} = req.body;
        
        
        
        let infoPost = await POST_MODEL.update({postID, topic, name, content});
        //console.log(infoPost);
        
        res.json({infoPost});
    
})

route.post('/remove-post', async (req, res) => {
    let {postID, topicID} = req.query;

    let infoPost = await POST_MODEL.remove({postID, topicID});

    res.json({infoPost});
})

//Thích bài viết
route.get('/like-post', async (req, res) => {
    console.log("Da vao thich bai viet")
    let { token } = req.session;
    let infoUser = await jwt.verify(token) ;
    console.log({infoUser});
    

    let { postID } = req.query;
    console.log({postID});

    let infoPostAfterUpdate = await POST_MODEL.likePost({ postID, userID: infoUser.data._id })
    
    console.log({infoPostAfterUpdate});
    

    res.json(infoPostAfterUpdate)
})

//Bỏ thích bài viết
route.get('/un-like-post', async (req, res) => {
    let { token } = req.session;
    let infoUser = await jwt.verify(token);
    let { postID } = req.query;
    let infoPostAfterUpdate = await POST_MODEL.unLikePost({ postID, userID: infoUser.data._id })
    res.json(infoPostAfterUpdate)
})

module.exports = route;