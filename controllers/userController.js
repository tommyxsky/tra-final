const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = mongoose.model('User');

//========= Login and Register view forms ==========
exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

//========== userRegisterValidation Updated after passport =========
exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('email', 'That Email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_dots: false
  });
  req.checkBody('password', 'Password cannot be blank').notEmpty();
  req
    .checkBody('password-confirm', 'Confirm Password cannot be blank')
    .notEmpty();
  req
    .checkBody('password-confirm', 'Oops. Your passwords do not match')
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash()
    });
    return; // Stopper
  }
  return next(); // If no error
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const registerWithPromise = promisify(User.register, User);
  await registerWithPromise(user, req.body.password);
  next(); // pass to authController.login
};
// ========== Added export account =========
exports.account = (req, res) => {
  res.render('account', { user: req.user, title: 'Edit Your Account' });
};

// ========== Added update account =========
exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );

  req.flash('success', 'Updated the profile');
  res.redirect('back');
  // res.redirect('/account') // this is just an alternative redirect option
};
