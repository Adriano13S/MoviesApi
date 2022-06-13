// const passport = require('passport')

const authCheck = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/admin');
};

module.exports = authCheck;