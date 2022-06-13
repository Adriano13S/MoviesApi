const login = (req, res) => {
  if(req.isAuthenticated()){
    res.redirect('/admin/users/' + req.session.passport.user);
  }else{
    res.render('login', {error: req.session.messages});
  }
};

module.exports = login;