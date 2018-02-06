module.exports.signup = ((req, res, next) => {
    let errorMessage = '';
    res.render('auth/signup', {
        errorMessage: errorMessage
    })
})
