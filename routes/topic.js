const route = require('express').Router();
const { CF_ROUTINGS } = require('../constant/core/base_api');
const  TOPIC_MODEL  = require('../models/topic');
const { renderToView } = require('../utils/childRouting');

let ObjectID = require('mongoose').Types.ObjectId;

route.get(CF_ROUTINGS.LIST_TOPIC, async (req, res) => {
    
    let listTopic = await TOPIC_MODEL.getList();
    
    res.json({listTopic});
    
})

route.get(CF_ROUTINGS.INFO_TOPIC, async (req, res) => {
    let { topicID } = req.query;
    let infoTopic = await TOPIC_MODEL.getInfo({ topicID })

    renderToView(req, res, 'pages/topic-detail', { infoTopic: infoTopic.data})

})

route.get(CF_ROUTINGS.INFO_TOPICDB, async (req, res) => {
    let { topicID } = req.query;
    let infoTopic = await TOPIC_MODEL.getInfo({ topicID })

    renderToView(req, res, 'pages/topic-detail-db', { infoTopic: infoTopic.data})

})

route.get(CF_ROUTINGS.EDIT_TOPIC, async (req, res) => {

    let {topicID} = req.params;
    
    let infoTopic = await TOPIC_MODEL.getInfo({ topicID });
    
    renderToView(req, res, 'pages/edit-topic', {infoTopic : infoTopic.data});
});

route.get(CF_ROUTINGS.ADD_TOPIC, (req, res) => {
    renderToView(req, res, 'pages/add-topic', {});
});

route.post(CF_ROUTINGS.ADD_TOPIC, async (req, res) => {
    let {name, authorID} = req.body;
    
    let infoTopic = await TOPIC_MODEL.insert({name, authorID});
    
    res.json({infoTopic});
})

route.get(CF_ROUTINGS.LIST_TOPIC, async (req, res) => {
    
    let infoTopic = await TOPIC_MODEL.getInfo();
    
    res.json({infoTopic});
    
})

route.post(CF_ROUTINGS.UPDATE_TOPIC, async (req, res) => {
    let {topicID} = req.params;
    
    let { name} = req.body;
    let infoTopic = await TOPIC_MODEL.update({topicID, name});
    
    res.json({infoTopic});
})

route.post(CF_ROUTINGS.REMOVE_TOPIC, async (req, res) => {
    let {topicID} = req.params;
    
    let infoTopic = await TOPIC_MODEL.remove({topicID});
    
    res.json({infoTopic});
})

module.exports = route;