const route = require('express').Router();
const  POST_MODEL  = require('../models/post');
const TOPIC_MODEL = require('../models/topic');
const COMMENT_MODEL = require('../models/comment');
const { renderToView } = require('../utils/childRouting');

let ObjectID = require('mongoose').Types.ObjectId;

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
    console.log(infoPost);
    
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


module.exports = route;