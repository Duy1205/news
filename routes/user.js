const route = require('express').Router();
const  USER_MODEL  = require('../models/user');
const  POST_MODEL  = require('../models/post');
const  moment = require('moment');
const USER_COLL = require('../database/user-coll');
const { renderToView } = require('../utils/childRouting');
const fs = require('fs');

const jwt = require('../utils/jwt');

let ObjectID = require('mongoose').Types.ObjectId;

route.get('/', async (req, res) => {
    renderToView(req, res, 'pages/home', { });
});

route.get('/dang-ky', async (req, res) => {
    res.render('pages/register', { alertErrorRegister: false });
})

route.get('/dang-nhap', async (req, res) => {
    res.render('pages/login');
})

route.get('/edit-user/:userID', async (req, res) => {

    let {userID} = req.params;
    
    let infoUser = await USER_MODEL.getInfo({ userID });
    // console.log({infoTopic});
    
    renderToView(req, res, 'pages/edit-user', {infoUser : infoUser.data});
});

route.get('/edit-password/:userID', async (req, res) => {

    let { userID } = req.params;

    let infoUser = await USER_MODEL.getInfo({userID});

    renderToView(req, res, 'pages/edit-password', {infoUser : infoUser.data})

})

route.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let infoUser = await USER_MODEL.signIn(email, password);
    console.log({infoUser});
    
    if(infoUser.error){
        return res.json(infoUser);
    }
    // if (infoUser.error && infoUser.message == 'email_not_exist')
    // res.cookie('token', infoUser.data.token, { maxAge: 900000 });
    // req.session.token = infoUser.data.token; //gán token đã tạo cho session
    // res.json({infoUser})
    req.session.token = infoUser.data.token; //gán token đã tạo cho session
    res.json({infoUser})
})

route.get('/dang-xuat', async (req, res) => {
    req.session.token = undefined;
    res.redirect('/');
})

route.get('/listUser', async (req, res) => {
    
    let listUser = await USER_MODEL.getList();
    console.log(listUser);
    
    res.json({listUser});
    
    
})

route.post('/add-user', async (req, res) => {
    let {email, fullname, password, avatar} = req.body;
    console.log({email, fullname, password, avatar});
    
    let infoUser = await USER_MODEL.insert({email, fullname, password, avatar});
    console.log(infoUser);
    
    res.json({infoUser});
})

route.get('/infoUser', async (req, res) => {
    
    let infoUser = await USER_MODEL.getInfo();
    console.log(infoUser);
    
    res.json({infoUser});
    
})

route.post('/register', async (req, res) => {
    let { email, password, fullname } = req.body;
    let infoUser = await USER_MODEL.register(email, password, fullname);
    console.log({infoUser});
    if(infoUser.error){
        return res.json(infoUser);
    }
   
    // if (infoUser.error && infoUser.message == 'email_existed')
        // return res.json({infoUser});
   
        //return res.redirect('/user/dang-nhap');
   
    return res.json({infoUser})
   
    // let {fullname, email, password} = req.body;
    // console.log({fullname, email, password});
    
    // let infoUser = await USER_MODEL.register(fullname, email, password);
    // console.log(infoUser);
    
    // res.json({infoUser});
});

route.post('/update-user/:userID', async (req, res) => {
    let {userID} = req.params;
    //console.log({topicID});
    
    let { fullname, password, avatar} = req.body;
    console.log({fullname, password, avatar});
    
    let infoUser = await USER_MODEL.update({userID, fullname, password});
    console.log(infoUser);
    
    res.json({infoUser});
})

route.post('/remove-user/:userID', async (req, res) => {
    let {userID} = req.params;
    //console.log({topicID});
    
    //let { name} = req.body;
    //console.log({name});
    
    let infoUser = await USER_MODEL.remove({userID});
    console.log(infoUser);
    
    res.json({infoUser});
})


module.exports = route;