const jwt       = require('../utils/jwt');
let POST_MODEL  = require('../models/post')
const moment    = require('moment');

let renderToView = async function(req, res, view, data) {

    let { token } = req.session;
    let user = await jwt.verify(token);

    let listPost = await POST_MODEL.getList();


    data.moment = moment;

    data.infoUser = user.data
    data.listPost = listPost.data


    res.render(view, data);
}
exports.renderToView = renderToView;