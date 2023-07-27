const db = require('../db');
const logger = require('../logger');
const {
  GET_USERS,
  GET_USER_BY_ID,
  VERIFY_USER,
  CREATE_USER,
  DELETE_USER,
} = require('../queries/users');
const { createHashedPassword, isEmailUnique, isWriter } = require('../util');
const { sendVerificationEmail } = require('./email');

const getUsers = async (req, res) => {
  const result = await db.query(GET_USERS);
  return res.json({ users: result.rows });
};

const getUserById = async (req, res) => {
  const userId = Number(req.params.userId);
  const { rows } = await db.query(GET_USER_BY_ID, [userId]);
  return res.json({ users: rows[0] });
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
    zip,
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
    zip,
    country,
  ];

  const { rows } = await db.query(CREATE_USER, sqlParams);
  const createdUser = rows[0];
  logger.info(`Created user: ${JSON.stringify(createdUser)}`);
  await sendVerificationEmail(req.body, createdUser.user_id);
  return res.json({ users: createdUser });
};

const verifyUser = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      message: 'The user id was missing from the request',
    });
  }
  const { rows } = await db.query(VERIFY_USER, [userId]);
  return res.json({
    message: `User : ${userId} email verfication was successful`,
  });
};

const updateUser = async (req, res) => {
  let fieldIncrementer = 1;
  const updateFields = [];
  const updateParams = [];
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
    zip,
    country,
    verified,
  } = req.body;
  const { userId } = req.params;
  const canUpdateUser =
    req.session.userId === userId || isWriter(req.session.roles);

  if (!canUpdateUser) {
    return res.status(403).json({
      message: 'You are not allowed to update this user',
    });
  }

  if (username) {
    updateFields.push(username);
    updateParams.push(`username = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (email) {
    updateFields.push(email);
    updateParams.push(`email = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (password) {
    const hash = await createHashedPassword(password);
    updateFields.push(hash);
    updateParams.push(`password_hash = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (firstName) {
    updateFields.push(firstName);
    updateParams.push(`first_name = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (lastName) {
    updateFields.push(lastName);
    updateParams.push(`last_name = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (dob) {
    updateFields.push(dob);
    updateParams.push(`date_of_birth = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (phone) {
    updateFields.push(phone);
    updateParams.push(`phone_number = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (address) {
    updateFields.push(address);
    updateParams.push(`address = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (city) {
    updateFields.push(city);
    updateParams.push(`city = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (state) {
    updateFields.push(state);
    updateParams.push(`state = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (zip) {
    updateFields.push(Number(zip));
    updateParams.push(`zip = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (country) {
    updateFields.push(country);
    updateParams.push(`country = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (verified) {
    updateFields.push(verified);
    updateParams.push(`verified = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  updateParams.push(`updated_date = now()`);
  updateFields.push(req.session.userId);
  updateParams.push(`updated_by = $${fieldIncrementer}`);
  fieldIncrementer++;
  updateFields.push(Number(userId));

  const statement = `
    UPDATE users
    SET ${updateParams.toString()}
    WHERE user_id = $${fieldIncrementer}
    RETURNING *;
  `;

  const { rows } = await db.query(statement, updateFields);
  return res.json({ users: rows[0] });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const canUpdateUser =
    req.session.userId === userId || isWriter(req.session.roles);

  if (!canUpdateUser) {
    return res.status(403).json({
      message: 'You are not allowed to delete this user',
    });
  }

  const { rows } = await db.query(DELETE_USER, [userId]);
  return res.json({
    users: `User: ${userId} was successfully deleted`,
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  verifyUser,
  updateUser,
  deleteUser,
};
