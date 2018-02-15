module.exports.login =(req, res, next) => {
    res.render('auth/login');
}
module.exports.signup =(req, res, next) => {
    res.render('auth/signup');
}
module.exports.doSignup =(req, res, next) => {
    let {name, email, password} = req.body;
    if(!name || !email || !pasword) {
        res.render('auth/signup', {
            error : {
                name: name ? '' : "Name is required",
                email: email ? '' : "Email is required",
                password: password ? '' : "Password is required"
            }
        })
    }
}
module.exports.doLogin =(req, res, next) => {
    let {email, password} = req.body;
    if(!email || !password) {
        res.render('auth/login', {
            error : {
                email: email ? '' : "Email is required",
                password: password ? '' : "Password is required"
            }
        })
    }
}
