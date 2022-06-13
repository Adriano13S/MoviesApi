const home = (req, res) => {
  res.render('home', {user: req.session.passport.user});
};

module.exports = home;