const route = require('express').Router();
const  TOPIC_MODEL  = require('../models/topic');

let ObjectID = require('mongoose').Types.ObjectId;

route.get('/listTopic', async (req, res) => {
    
    let listTopic = await TOPIC_MODEL.getList();
    console.log(listTopic);
    
    res.json({listTopic});
    
})

route.post('/add-topic', async (req, res) => {
    let {name, authorID} = req.body;
    console.log({name, authorID});
    
    let infoTopic = await TOPIC_MODEL.insert({name, authorID});
    console.log(infoTopic);
    
    res.json({infoTopic});
})

route.get('/infoTopic', async (req, res) => {
    
    let infoTopic = await TOPIC_MODEL.getInfo();
    console.log(infoTopic);
    
    res.json({infoTopic});
    
})

route.post('/update-topic/:topicID', async (req, res) => {
    let {topicID} = req.params;
    //console.log({topicID});
    
    let { name} = req.body;
    console.log({name});
    
    let infoTopic = await TOPIC_MODEL.update({topicID, name});
    console.log(infoTopic);
    
    res.json({infoTopic});
})

route.post('/remove-topic/:topicID', async (req, res) => {
    let {topicID} = req.params;
    //console.log({topicID});
    
    //let { name} = req.body;
    //console.log({name});
    
    let infoTopic = await TOPIC_MODEL.remove({topicID});
    console.log(infoTopic);
    
    res.json({infoTopic});
})

module.exports = route;