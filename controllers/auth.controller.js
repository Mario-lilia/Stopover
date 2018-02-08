module.exports.login = (req, res, next) => {
  res.render('auth/login');
}
module.exports.signup = (req, res, next) => {
  res.render('auth/signup');
}
module.exports.doSignup = (req, res, next) => {
  let email = req.body.email;
  console.log(email);

  let name = req.body.name;
  console.log(name);
  let password = req.body.password;
  console.log(password);




  res.render('auth/signup');
}
