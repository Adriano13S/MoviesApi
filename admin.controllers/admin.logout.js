const logout = (req, res) => {
  req.logOut();
  res.redirect('/admin');
};

module.exports = logout;