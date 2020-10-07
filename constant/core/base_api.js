const CF_ROUTINGS = {

    //USER
    REGISTER: '/register',
    LOGIN: '/login', 
    LOGIN_ADMIN: '/dang-nhap-admin',
    LOGOUT: '/dang-xuat',
    ADD_USER: '/add-user',
    EDIT_USER: '/edit-user/:userID',
    EDIT_USER: '/edit-user/:userID',
    EDIT_ADMIN: '/edit-admin/:userID',
    EDIT_ADMIN2: '/edit-admin2/:userID',
    EDIT_PASSWORD: '/edit-password/:userID',
    UPDATE_USER: '/update-user/:userID',
    REMOVE_USER: '/remove-user/:userID',
    INFO_USER2: '/info-user2/:userID',
    INFO_USER: '/info-user',
    LIST_TABLE: '/listTable',
    LIST_USER: '/listUser',
    DASHBOARD: '/dashboard',
    DASHBOARD2: '/dashboard2',
    DASHBOARD3: '/dashboard3',

    //TOPIC

    ADD_TOPIC: '/add-topic',
    LIST_TOPIC: '/listTopic',
    INFO_TOPIC: '/info-topic',
    INFO_TOPICDB:'/info-topicdb',
    EDIT_TOPIC: '/edit-topic/:topicID',
    UPDATE_TOPIC: '/update-topic/:topicID',
    REMOVE_TOPIC: '/remove-topic/:topicID',

    //POST

    ADD_POST: '/add-post',
    LIST_POST: '/listPost',
    INFO_POST: '/info-post',
    INFO_POSTDB:'/info-postdb',
    EDIT_POST: '/edit-post/:postID',
    UPDATE_POST: '/update-post/:postID',
    REMOVE_POST: '/remove-post',
    LIKE_POST: '/like-post',
    UNLIKE_POST: '/un-like-post',
    INFO_HOT_POST: '/info-hot',
    RECENT_POST: '/recentpost',

    //COMMENT

    ADD_COMMENT: '/add-comment',
    LIST_COMMENT: '/listComment',
    INFO_COMMENT: '/info-comment',
    UPDATE_COMMENT: '/update-comment',
    REMOVE_COMMENT: '/remove-comment',




}
exports.CF_ROUTINGS = CF_ROUTINGS;
