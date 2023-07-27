const logger = require('../logger');
const authService = require('../service').auth;

const login = async (req, res, next) => {
  try {
    return await authService.login(req, res, next);
  } catch (e) {
    logger.error(
      `There was a problem logging in the user. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const unauthorized = async (req, res) => {
  try {
    return await authService.unauthorized(req, res);
  } catch (e) {
    logger.error(
      `There was a problem returning the unauthorized route. Error: ${e}`
    );
    return res.status(500).json({ e });
  }
};

const logout = async (req, res) => {
  try {
    return await authService.logout(req, res);
  } catch (e) {
    logger.error(`There was a problem logging out the user. Error: ${e}`);
    return res.status(500).json({ e });
  }
};

module.exports = {
  login,
  unauthorized,
  logout,
};
