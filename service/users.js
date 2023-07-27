const db = require('../db');
const queries = require('../queries/users');
const logger = require('../logger');
const { createHashedPassword, isEmailUnique } = require('../util');
const { sendVerificationEmail } = require('./email');

const getUsers = async (req, res) => {
  const result = await db.query(queries.GET_USERS);
  return res.json({ users: result.rows });
};

const getUserById = (req, res) => {
  const userId = Number(req.params.userId);
  logger.info(`Getting the user by id: ${userId}`);
  return db.query(queries.GET_USER_BY_ID, [userId], (error, results) => {
    if (error) {
      logger.error(error);
      throw new Error(error);
    }
    return res.json({ users: results.rows[0] });
  });
};

const createUser = async (req, res) => {
  const nonNullFields = [];
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    dob,
    phone,
    address,
    city,
    state,
    country,
  } = req.body;

  if (!isEmailUnique(email)) {
    return res.status(409).json({
      message:
        'The provided email was already found in our sytem. Please provide a different email.',
    });
  }

  if (!username) {
    nonNullFields.push('username ');
  }
  if (!email) {
    nonNullFields.push('email ');
  }
  if (!password) {
    nonNullFields.push('password ');
  }
  if (!firstName) {
    nonNullFields.push('firstName ');
  }
  if (!lastName) {
    nonNullFields.push('lastName');
  }

  if (nonNullFields.lenth > 0) {
    return res.status(400).json({
      message: `The following fields are required to create a user: ${nonNullFields.toString}`,
    });
  }

  const hash = await createHashedPassword(password);
  const sqlParams = [
    username,
    email,
    hash,
    firstName,
    lastName,
    dob,
    phone,
    address,
    city,
    state,
    country,
  ];

  return db.query(queries.CREATE_USER, sqlParams, async (error, results) => {
    if (error) {
      const message = `There was a problem creating the user: ${JSON.stringify(
        error
      )}`;
      logger.error(message);
      throw new Error(error);
    }
    const createdUser = results.rows[0];
    logger.info(`Created user: ${JSON.stringify(createdUser)}`);
    await sendVerificationEmail(req.body, createdUser.user_id);
    return res.json({ users: createdUser });
  });
};

const verifyUser = (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      message: 'The user id was missing from the request',
    });
  }

  return db.query(queries.VERIFY_USER, [userId], (error) => {
    if (error) {
      const message = `There was a problem verifying the user: ${JSON.stringify(
        error
      )}`;
      logger.error(message);
      throw new Error(error);
    }

    return res.json({
      message: `User : ${userId} email verfication was successful`,
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  verifyUser,
};
