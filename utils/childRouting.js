const jwt       = require('../utils/jwt');
const toastr    = require('toastr');
let POST_MODEL  = require('../models/post');
let TOPIC_MODEL = require('../models/topic');
let COMMENT_MODEL = require('../models/comment');
let USER_MODEL = require('../models/user');
const moment    = require('moment');

let renderToView = async function(req, res, view, data) {

    let { token } = req.session;
    if(token){
        let user = await jwt.verify(token);
        data.infoUser = user.data;
    }else{
        data.infoUser = undefined;

    }

    let listPost = await POST_MODEL.getList();
    let listPostTop5 = await POST_MODEL.getListPostTop5();
    let listTopic = await TOPIC_MODEL.getList();
    let listComment = await COMMENT_MODEL.getList();
    let listUser = await USER_MODEL.getList();
    let listTopView = await POST_MODEL.listTopView();
    let listSpecialPost = await POST_MODEL.listSpecialPost();
    let listCmtPost = await POST_MODEL.listCmtPost();
;
    data.moment = moment;

    data.listTopic = listTopic.data;
    data.listPostTop5 = listPostTop5.data;
    data.listPost = listPost.data;
    data.listComment = listComment.data;
    data.listUser = listUser.data;
    data.listTopView = listTopView.data;
    data.listSpecialPost = listSpecialPost.data;
    data.listCmtPost = listCmtPost.data;

    res.render(view, data);
}
exports.renderToView = renderToView;