const { sign, verify } = require('../utils/jwt')
module.exports = async function (req, res, next) {
    // let token = req.cookies['token'];
    let { token } = req.session;
    if (!token)
        res.redirect('/user/login');
    let checkRole = await verify(token);
    if (checkRole.data.role !== 1)
        res.redirect('/');
    next();
}