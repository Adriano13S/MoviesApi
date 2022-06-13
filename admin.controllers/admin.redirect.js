const authRedirect = (req, res) => {
  res.redirect('/admin/users/' + req.session.passport.user);
};

module.exports = authRedirect;