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
    // Session
    // Hiểu đơn giản thế này, giả sử bạn vào một khu du lịch rất rộng có rất nhiều cổng, 
    // mỗi cổng có một cửa soát 2 thứ: (1) Chứng minh nhân dân, (2) Vé (có in hình, tên tuổi, ngày sinh) của bạn.
    //  Nếu mỗi lần đi qua 1 cổng đều phải trình 2 thứ này ra thì nhiêu khê mất thời gian quá. 
    // Thế nên ban quản lý khu du lịch sẽ làm một cách nào đó để lưu thông tin cá nhân của bạn
    //  sau lần trình giấy tờ lần đầu tiên, sau đó nếu bạn đi loanh quanh trong ngày qua các cổng kia thì cứ tự nhiên mà qua thôi,
    //  không bị hỏi han gì nữa. Cái này gần gần với "session", là một nơi lưu dữ liệu cá nhân của bạn, 
    // để bạn có thể truy cập vào các mục khác nhau (ứng với các đường dẫn khác nhau) của một trang web mà không phải đăng nhập
    //  đi đăng nhập lại với cùng 1 username và password.

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