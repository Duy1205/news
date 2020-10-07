const route = require('express').Router();
const  POST_MODEL  = require('../models/post');
const COMMENT_MODEL = require('../models/comment');
const USER_MODEL = require('../models/user');
const jwt       = require('../utils/jwt');
const checkActive       = require('../utils/checkActive');
const { CF_ROUTINGS } = require('../constant/core/base_api');

let ObjectID = require('mongoose').Types.ObjectId;

route.get(CF_ROUTINGS.ADD_COMMENT, checkActive, async (req, res) => {
    let { token } = req.session;
    let infoUser = await jwt.verify(token);

    let { postID, content } = req.query;
    
    let infoComment = await COMMENT_MODEL.insert({ postID, content, author: infoUser.data._id });

    res.json({infoComment});
}) 

route.get(CF_ROUTINGS.LIST_COMMENT, async (req, res) => {
    let listComment = await COMMENT_MODEL.getList();
    
    res.json({listComment})
})

route.get(CF_ROUTINGS.INFO_COMMENT, async (req, res) => {
    let { commentID } = req.query;

   let infoComment = await COMMENT_MODEL.getInfo({commentID})

    res.render('pages/post-detail', { infoComment :  infoComment.data})
})



route.post(CF_ROUTINGS.UPDATE_COMMENT, async (req, res) => {
    let {commentID} = req.params;
    
    let { content} = req.body;
    
    let infoComment = await COMMENT_MODEL.update({commentID, content});
    console.log(infoComment);
    
    res.json({infoComment});
})

route.get(CF_ROUTINGS.REMOVE_COMMENT, checkActive, async (req, res) => {
    let {commentID, postID} = req.query;

    let infoCommentRemove = await COMMENT_MODEL.remove({commentID, postID});
    
    res.json({infoCommentRemove});
})


module.exports = route;