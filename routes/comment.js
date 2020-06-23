const route = require('express').Router();
const  POST_MODEL  = require('../models/post');
const COMMENT_MODEL = require('../models/comment');
const USER_MODEL = require('../models/user');
const checkActive       = require('../utils/checkActive');

let ObjectID = require('mongoose').Types.ObjectId;



// route.get('/listComment', async (req, res) => {
//     let listComment = await COMMENT_MODEL.getList();
//     console.log({listComment});
    
//     res.json({listComment})
// })

route.post('/add-comment', checkActive, async (req, res) => {
    //console.log({content, post});
    let infoUser = req.session;
    let {postID, content, author} = req.body;
    let infoComment = await COMMENT_MODEL.insert({postID, content, author});
    console.log(infoComment);

    res.json({infoComment});
    
    
})

// route.get('/infoComment', async (req, res) => {
    
//     let infoComment = await COMMENT_MODEL.getInfo();
//     console.log(infoComment);
    
//     res.json({infoComment});
    
// })

route.get('/listComment', async (req, res) => {
    let listComment = await COMMENT_MODEL.getList();
    //console.log({listComment});
    
    res.json({listComment})
})

route.get('/info-comment', async (req, res) => {
    
    // let infoComment = await COMMENT_MODEL.getInfo();
    // console.log(infoComment);
    
    // res.json({infoComment});
    let { commentID } = req.query;
    // let commentID = await POST_MODEL.getInfo({ commentID })

   let infoComment = await COMMENT_MODEL.getInfo({commentID})

    res.render('pages/post-detail', { infoComment :  infoComment.data})
})



route.post('/update-comment', async (req, res) => {
    let {commentID} = req.params;
    //console.log({commentID});
    
    let { content} = req.body;
    //console.log({content});
    
    let infoComment = await COMMENT_MODEL.update({commentID, content});
    console.log(infoComment);
    
    res.json({infoComment});
})

route.post('/remove-comment/:commentID',checkActive, async (req, res) => {
    let {commentID, postID} = req.body;
    //console.log({commentID});
    
    //let { name} = req.body;
    //console.log({name});
    
    let infoCommentRemove = await COMMENT_MODEL.remove({commentID, postID});
    // console.log(infoComment);
    
    res.json({infoCommentRemove});
})


module.exports = route;