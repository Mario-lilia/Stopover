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
let updateImage = {};
if(req.file) {
    updateImage['imgUrl'] = `./avatar/${req.file.filename}`;
}
let update = Object.assign({}, req.body, updateImage)
const {_id} = res.locals.session;

User.findByIdAndUpdate(_id, update)
    .then(user => {
    res.redirect(`/users/${_id}`);
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