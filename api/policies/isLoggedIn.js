var passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('jwt', (error, user) => {
    if (error) {
      return res.serverError(error);
    }
    if (!user) {
      return res.forbidden();
    }
    req.user = user;

    next();
  })(req, res);
};
