const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db');
const logger = require('../logger');
const {
  GET_USER_BY_ID,
  GET_USER_BY_USERNAME,
  UPDATE_USER_LOGIN,
} = require('../queries/users');

const serializeUser = (user, done) => {
  logger.debug(
    `Successfully serialized the following user: ${JSON.stringify(user)}`
  );
  done(null, user.user_id);
};

const deserializeUser = async (id, done) => {
  const { rows } = await db.query(GET_USER_BY_ID, [id]);
  const user = rows[0];
  logger.debug(
    `Successfully deserialized the following user: ${JSON.stringify(user)}`
  );
  done(null, user);
};

const localStrategy = async (username, password, done) => {
  let message = '';
  logger.info(`Authenticating user: username = ${username}`);
  try {
    const { rows } = await db.query(GET_USER_BY_USERNAME, [username]);
    const user = rows[0];
    if (!user) {
      message = `There is no user found with the username: ${username}`;
      logger.info(message);
      return done(null, false, { message });
    }
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    logger.info(`isValidPassword: ${isValidPassword}`);
    if (!isValidPassword) {
      message = `The password entered is incorrect for user with username: ${username}`;
      logger.info(message);
      return done(null, false, { message });
    }
    try {
      await db.query(UPDATE_USER_LOGIN, [user.user_id]);
    } catch (e) {
      logger.error(
        `There was a problem updating the user login: ${JSON.stringify(e)}`
      );
    }
    logger.debug(
      `Successfully validated user: ${user.username} with id: ${user.user_id}`
    );
    delete user.password_hash;
    return done(null, user);
  } catch (error) {
    message = `There was a problem looking up the user in the database: ${JSON.stringify(
      error
    )}`;
    logger.error(message);
    return done(error, false, { message });
  }
};

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
passport.use('local', new LocalStrategy(localStrategy));

const isAuthenticated = (req, res, next) => {
  logger.debug(`isAuthenticated(): ${req.isAuthenticated()}`);
  logger.debug(req.session.userId);
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/unauthorized');
};

module.exports = {
  serializeUser,
  deserializeUser,
  localStrategy,
  isAuthenticated,
};
