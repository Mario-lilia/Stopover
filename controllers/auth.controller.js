const mongoose = require('mongoose');
const User = require('../models/user.model');


module.exports.login = (req, res, next) => {
  res.render('auth/login');
}
module.exports.signup = (req, res, next) => {
  res.render('auth/signup');
}
module.exports.doSignup = (req, res, next) => {
let name = req.body.name;
console.log(name);
let email = req.body.email;
console.log(email);
let password = req.body.password;
console.log(password);
if (!name || !email || !password) {
  res.render('auth/signup', {
    error: {
      name: name ? '' : 'name is required',
      email: email ? '' : 'email is required',
      password: password ? '' : 'password is required'

    },
    data: {
      name: !name ? '' : name,
      email: !email ? '' : email,
      password: !password ? '' : password

    }
  })
} else {
   User.findOne({ email:email })
   .then (user => {
     if (user != null) {
       res.render('auth/signup',{ error: {name:name}})
     } else {
       const user = new User();
       user.name = name;
       user.email = email;
       user.password = password;
       console.log(user);
       user.save()
         .then(() =>{

           res.redirect('/auth/login');
         })
         .catch(error => {
           console.log('aasdfasdadasdas');
           if (error instanceof mongoose.Error.ValidationError) {
             res.render('auth/signup', {
               user: user,
               error: error.errors
             });
           } else {
             next(error);
           }
         });
     }
   })

}
};
