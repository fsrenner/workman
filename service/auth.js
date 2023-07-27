const passport = require('passport');
const logger = require('../logger');

const login = (req, res, next) =>
  passport.authenticate(['local'], (error, user, info) => {
    if (error) {
      return res.status(500).json({ error });
    }
    if (!user) {
      return res.status(404).json({ message: info.message });
    }
    req.session.userId = user.user_id;
    logger.info(req.session);
    return res.json({ user });
  })(req, res, next);

const unauthorized = (req, res) =>
  res.status(401).json({
    message: 'You are not authorized to access this application',
  });

const logout = (req, res) => {
  req.logout();
  return res.json({
    message: 'You have successfully logged out of the application',
  });
};

module.exports = {
  login,
  unauthorized,
  logout,
};
