const mongoose = require('mongoose');
const User = require('../models/users.models');
const passport = require('passport');


module.exports.login = (req, res, next) => {
    res.render('auth/login');
}
module.exports.signup = (req, res, next) => {
    res.render('auth/signup');
}
module.exports.doSignup = (req, res, next) => {
    let {
        name,
        email,
        password
    } = req.body;
    if (!name || !email || !password) {
        res.render('auth/signup', {
            error: {
                name: name ? '' : "Name is required",
                email: email ? '' : "Email is required",
                password: password ? '' : "Password is required"
            }
        })
    } else {
        User.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user != null) {
                    res.render('auth/signup', {
                        user: user,
                        error: {
                            email: 'User already register'
                        }
                    });
                } else {
                    user = new User(req.body);
                    user.save()
                        .then(() => {
                            res.redirect('/auth/login');
                        }).catch(error => {
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
            .catch(error => next(error));
    }


}




module.exports.doLogin = (req, res, next) => {
    let {
        email,
        password
    } = req.body;
    if (!email || !password) {
        res.render('auth/login', {
            error: {
                email: email ? '' : "Email is required",
                password: password ? '' : "Password is required"
            }
        })
    } else {
        passport.authenticate('local-auth', (error, user, validation) => {
            if (error) {
                next(error);
            } else if (!user) {
                res.render('auth/login', {
                    error: validation
                });
            } else {
                req.login(user, (error) => {
                    if (error) {
                        next(error);
                    } else {
                        res.redirect(`/users/${user._id}`);
                    }
                });
            }
        })(req, res, next);
    }
}

module.exports.loginWithProviderCallback = (req, res, next) => {
    passport.authenticate('google-auth', (error, user) => {
        if (error) {
            next(error);
        } else {
            req.login(user, (error) => {
                if (error) {
                    next(error);
                } else {
                    res.redirect(`/users/${user._id}`);
                }
            });
        }
    })(req, res, next);
}

module.exports.logout = (req, res, next) => {
    //res.send("hola")
    req.logout();
    res.redirect('/auth/login');
}