module.exports.profile = (req, res, next) => {
  let name = req.body.name;
  console.log(name);
  let email = req.body.email;
  console.log(email);
  let password = req.body.password;
  console.log(password);
  if(!name || !email || !password){
    res.render('auth/signup',{error: {
           name: name ? '' : 'name is required',
           email: email ? '' : 'email is required',
           password: password ? '' : 'password is required'

         }})
  }else{
      res.render('user/myprofile',{name:name , email:email});
  }







};
