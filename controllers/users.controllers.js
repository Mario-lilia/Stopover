const User = require('../models/users.models')

module.exports.profile = (req, res, next) => {
  
      res.render('users/profile')
        

};
module.exports.list = (req, res, next) => {
  User.find({})
      .then(users => {
          res.render('user/list', {
              users: users
          });
      })
      .catch(error => next(error));
}
      
module.exports.update = (req, res, next) => {
   
    res.render('users/update');
  

};
module.exports.doUpdate = (req, res, next) => {
  const user = new User(req.body)
  const id = req.params.id
  user._id = id
  User.findByIdAndUpdate(id, user)
     .then(user => {
       res.redirect('/users/'+id);
     })
     .catch(error => next(error));

};

module.exports.doDelete = (req, res, next) => {
  const id = req.params.id;
 User.findByIdAndRemove(id)
  .then(users => {
   res.redirect('/');
 })
.catch(error => next(error))

};