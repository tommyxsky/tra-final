const passport = require('passport');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login',
  successRedirect: '/',
  successFlash: 'You are now logged in'
});
// ========= Added logout =========
exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/');
};

//========= Add middleware to check if the user is logged in ========
exports.isLoggedIn = (req, res, next) => {
  // ========= first check if the user is authenticated =========
  if (req.isAuthenticated()) {
    next(); // ========= if all good. user is logged in =========
    return;
  }
  req.flash('error', 'You must be logged in to perform that action');
  res.redirect('/login');
};
