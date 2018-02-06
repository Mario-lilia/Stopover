module.exports.signup = ((req, res, next) => {
    res.render('auth/signup')
})
module.exports.login = ((req, res, next) => {
  res.render('auth/login')

})
module.exports.loginPost = ((req, res, next) => {
 let nombre = req.body.name;
  console.log(nombre);
   res.render('auth/login',{nombre:nombre});

})
