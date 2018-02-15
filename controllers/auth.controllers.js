module.exports.login =(req, res, next) => {
    res.render('auth/login');
}
module.exports.signup =(req, res, next) => {
    res.render('auth/signup');
}