const route = require('express').Router();
const  USER_MODEL  = require('../models/user');
const  POST_MODEL  = require('../models/post');
const  moment = require('moment');
const USER_COLL = require('../database/user-coll');
const { renderToView } = require('../utils/childRouting');
const fs = require('fs');

let { CF_ROUTINGS }         = require('../constant/core/base_api');

const jwt = require('../utils/jwt');
const { uploadMulter } = require('../utils/config-multer');

let ROLE_ADMIN       = require('../utils/checkRole');


let ObjectID = require('mongoose').Types.ObjectId;

route.get(CF_ROUTINGS.REGISTER, async (req, res) => {
    res.render('pages/register', { alertErrorRegister: false });
})

route.get(CF_ROUTINGS.LOGIN, async (req, res) => {
    renderToView(req, res,'pages/login', { });
})

route.get(CF_ROUTINGS.LOGIN_ADMIN, (req, res) => {
    renderToView( req, res, 'pages/logindb', { });
})

route.get(CF_ROUTINGS.EDIT_USER, async (req, res) => {

    let {userID} = req.params;
    
    let infoUser = await USER_MODEL.getInfo({ userID });
    
    renderToView(req, res, 'pages/edit-user', {infoUser : infoUser.data});
});

route.get(CF_ROUTINGS.INFO_USER, async (req, res) => {

    let {userID} = req.params;
    
    let infoUser = await USER_MODEL.getInfo({ userID });
    
    renderToView(req, res, 'pages/info-user2', {infoUser : infoUser.data});
});

route.get(CF_ROUTINGS.EDIT_ADMIN, async (req, res) => {

    let {userID} = req.params;
    
    let infoUser = await USER_MODEL.getInfo({ userID });
    
    renderToView(req, res, 'pages/edit-admin', {infoUser : infoUser.data});
});

route.get(CF_ROUTINGS.EDIT_ADMIN2, async (req, res) => {

    let {userID} = req.params;
    
    let infoUser = await USER_MODEL.getInfo({ userID });
    
    renderToView(req, res, 'pages/edit-admin2', {infoUser : infoUser.data});
});

route.get(CF_ROUTINGS.EDIT_PASSWORD, async (req, res) => {

    let { userID } = req.params;

    let infoUser = await USER_MODEL.getInfo({userID});

    renderToView(req, res, 'pages/edit-password', {infoUser : infoUser.data})

})

route.post(CF_ROUTINGS.LOGIN, async (req, res) => {
    let { email, password } = req.body;

    let infoUser = await USER_MODEL.signIn(email, password);
    
    if(infoUser.error){
        return res.json(infoUser);
    }
   
    req.session.token = infoUser.data.token; //gán token đã tạo cho session
    res.json({infoUser})
})

route.get(CF_ROUTINGS.LOGOUT, async (req, res) => {
    req.session.token = undefined;
    res.redirect('/');
})

route.get(CF_ROUTINGS.LIST_USER, async (req, res) => {
    
    let listUser = await USER_MODEL.getList();
    console.log(listUser);
    
    res.json({listUser});
    
    
})

route.get(CF_ROUTINGS.DASHBOARD, (req, res) => {
    renderToView(req, res, 'pages/logindb', {});
});

route.get(CF_ROUTINGS.DASHBOARD2, ROLE_ADMIN, (req, res) => {
    renderToView(req, res, 'pages/dashboard2', {});
});

route.get(CF_ROUTINGS.DASHBOARD3, (req, res) => {
    renderToView(req, res, 'pages/dashboard', {});
});

route.get(CF_ROUTINGS.LIST_TABLE, (req, res) => {
    renderToView(req, res, 'pages/listTable', {});
});

route.get(CF_ROUTINGS.LIST_TABLE, async (req, res) => {
    
    let listUser = await USER_MODEL.getList();
    console.log(listUser);
    
    res.json({listUser});
    
})

route.get(CF_ROUTINGS.ADD_USER, (req, res) => {
    renderToView(req, res, 'pages/add-user', {});
});

route.post(CF_ROUTINGS.ADD_USER, async (req, res) => {
    let {email, fullname, password, avatar} = req.body;
    console.log({email, fullname, password, avatar});
    
    let infoUser = await USER_MODEL.insert({email, fullname, password, avatar});
    console.log(infoUser);
    
    res.json({infoUser});
})

route.get(CF_ROUTINGS.INFO_USER, async (req, res) => {
    
    let {userID} = req.query;

    console.log(userID);
    
    let infoUser = await USER_MODEL.getInfo({userID})
    res.json(infoUser)
    
    
})

route.post(CF_ROUTINGS.REGISTER, async (req, res) => {
    let { email, password, fullname } = req.body;

    let infoUser = await USER_MODEL.register(email, password, fullname);

    console.log({infoUser});
    if(infoUser.error){
        return res.json(infoUser);
    }
   
    return res.json({infoUser})
   
});

route.post(CF_ROUTINGS.UPDATE_USER,uploadMulter.single('avatar') ,async (req, res) => {
    let {userID} = req.params;
    
    let { fullname} = req.body;
    let infoFile = req.file;

    let infoUser = await USER_MODEL.update({userID, fullname, avatar: infoFile.originalname});
    
    res.json({infoUser});
})

route.post(CF_ROUTINGS.REMOVE_USER, async (req, res) => {
    let {userID} = req.params;
    
    let infoUser = await USER_MODEL.remove({userID});
    console.log(infoUser);
    
    res.json({infoUser});
})

module.exports = route;