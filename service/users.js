const db = require('../db');
const logger = require('../logger');

const {
  GET_USERS,
  GET_USER_BY_ID,
  VERIFY_USER,
  CREATE_USER,
  DELETE_USER,
} = require('../queries/users');
const { CREATE_USERS_ROLES } = require('../queries/users_roles');
const {
  createHashedPassword,
  isEmailUnique,
  userTableFields,
  getWhereClauseParameters,
} = require('../util');
const { sendVerificationEmail } = require('./email');

const getUsers = async (req, res) => {
  const DESC = 'desc';
  const ASC = 'asc';
  const params = [];
  const filtering = [];
  let fieldIncrementer = 1;
  let limitFilter = '';
  let offsetFilter = '';
  let orderBy = '';
  const {
    id,
    username,
    email,
    firstName,
    lastName,
    dob,
    phone,
    address,
    city,
    state,
    zip,
    lastLogin,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy,
    verified,
    sort,
    limit,
    offset,
  } = req.query;
  if (id) {
    params.push(Number(id));
    filtering.push(`${userTableFields.id} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (username) {
    params.push(username);
    filtering.push(
      `${userTableFields.username} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (email) {
    params.push(email);
    filtering.push(
      `${userTableFields.email} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (firstName) {
    params.push(firstName);
    filtering.push(
      `${userTableFields.firstName} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (lastName) {
    params.push(lastName);
    filtering.push(
      `${userTableFields.lastName} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (dob) {
    params.push(dob);
    filtering.push(
      `${userTableFields.dob} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (phone) {
    params.push(phone);
    filtering.push(
      `${userTableFields.phone} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (address) {
    params.push(address);
    filtering.push(
      `${userTableFields.address} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (city) {
    params.push(city);
    filtering.push(
      `${userTableFields.city} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (state) {
    params.push(state);
    filtering.push(
      `${userTableFields.state} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (zip) {
    params.push(Number(zip));
    filtering.push(
      `${userTableFields.zip} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (lastLogin) {
    params.push(lastLogin);
    filtering.push(`${userTableFields.lastLogin} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (createdBy) {
    params.push(Number(createdBy));
    filtering.push(`${userTableFields.createdBy} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (createdDate) {
    params.push(createdDate);
    filtering.push(`${userTableFields.createdDate} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (updatedBy) {
    params.push(Number(updatedBy));
    filtering.push(`${userTableFields.updatedBy} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (updatedDate) {
    params.push(updatedDate);
    filtering.push(`${userTableFields.updatedDate} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (verified) {
    params.push(verified);
    filtering.push(`${userTableFields.verified} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (sort) {
    const splitSort = sort.trim().split(' ');
    const orderParam = splitSort[0].trim();
    let direction = splitSort[1].trim();
    if (!direction || direction === DESC) {
      direction = DESC;
    } else if (direction === ASC) {
      direction = ASC;
    } else {
      direction = DESC;
    }
    const tableFieldValue = userTableFields[orderParam];

    if (!tableFieldValue) {
      orderBy = '';
    } else {
      orderBy = `ORDER BY ${tableFieldValue} ${direction}`;
    }
  }
  if (limit) {
    params.push(Number(limit));
    limitFilter = `LIMIT $${fieldIncrementer}`;
    fieldIncrementer++;
  }
  if (offset) {
    params.push(offset);
    offsetFilter = `OFFSET $${fieldIncrementer}`;
    fieldIncrementer++;
  }
  const fullQuery = `
    ${GET_USERS}
    ${getWhereClauseParameters(filtering)}
    ${orderBy}
    ${limitFilter}
    ${offsetFilter}
  `;

  logger.debug(fullQuery);
  logger.debug(params);
  const result = await db.query(fullQuery, params);
  return res.json({ users: result.rows });
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const { rows } = await db.query(GET_USER_BY_ID, [userId]);
  return res.json({ users: rows[0] });
};

const createUser = async (req, res) => {
  const { userId } = req.session;
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

  if (nonNullFields.length > 0) {
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
    dob || null,
    phone || null,
    address || null,
    city || null,
    state || null,
    Number(zip),
    userId || 0,
  ];

  const { rows } = await db.query(CREATE_USER, sqlParams);
  const createdUser = rows[0];
  await db.query(CREATE_USERS_ROLES, [userId, 4, userId]);
  logger.info(`Created user: ${JSON.stringify(createdUser)}`);
  await sendVerificationEmail(req.body, createdUser.user_id);
  return res.json({ users: createdUser });
};

const verifyUser = async (req, res) => {
  const { userId } = req.params;
  await db.query(VERIFY_USER, [userId]);
  const message = `User : ${userId} email verfication was successful`;
  logger.info(message);
  return res.json({
    users: message,
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
    verified,
  } = req.body;
  const { userId } = req.params;

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
  if (verified) {
    updateFields.push(verified);
    updateParams.push(`verified = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  updateParams.push(
    `updated_date = CAST (EXTRACT (epoch from current_timestamp) AS BIGINT)`
  );
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
  logger.info(`Successfully updated user: ${JSON.stringify(rows[0])}`);
  return res.json({ users: rows[0] });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  await db.query(DELETE_USER, [userId]);
  const message = `User: ${userId} was successfully deleted`;
  logger.info(message);
  return res.json({
    users: message,
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
