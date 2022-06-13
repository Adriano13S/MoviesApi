const passport = require('passport');
const localStrategy = require('passport-local');
const usr = process.env.LOGIN_USR 
const pass = process.env.LOGIN_PASS

// auth strategy
passport.use(new localStrategy({usernameField:"username", passwordField:"password"},
 (username, password, cb) => {
  if(!usr.includes(username)){
    return cb(null, false, {message: 'incorect username'});
  }
  if(!pass.includes(password)){
    return cb(null, false, {message: 'incorect password'});
  }
  return cb(null, username);
}));


// session required
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


const authMiddleware = passport.authenticate('local', { failureRedirect: '/admin', failureMessage: true})

module.exports = authMiddleware;