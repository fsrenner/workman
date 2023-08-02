const passport = require('passport');
const logger = require('../logger');
const util = require('../util');

const handleAuthenticatedUser = async (req, res, error, user, info) => {
  if (error) {
    return res.status(500).json({ error });
  }
  if (!user) {
    return res.status(404).json({ message: info.message });
  }
  const userId = user.user_id;
  const roles = await util.getUserRoles(Number(userId));
  req.session.userId = userId;
  req.session.roles = roles;
  logger.debug(req.session);
  logger.info(
    `The following user has logged into Workman: ${JSON.stringify(user)}`
  );
  return res.json({ user });
};

const login = (req, res, next) =>
  passport.authenticate(['local'], (error, user, info) =>
    handleAuthenticatedUser(req, res, error, user, info)
  )(req, res, next);

const unauthorized = (req, res) =>
  res.status(401).json({
    message: 'You are not authorized to access this application',
  });

const logout = (req, res, next) => {
  const { userId } = req.session;
  req.logout((error) => {
    if (error) {
      return next();
    }
    logger.info(
      `The following user has logged out of Workman: ${JSON.stringify(userId)}`
    );
    return res.json({
      message: 'You have successfully logged out of the application',
    });
  });
};

module.exports = {
  handleAuthenticatedUser,
  login,
  unauthorized,
  logout,
};
