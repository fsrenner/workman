const bcrypt = require('bcrypt');
const db = require('../db');
const { GET_EMAIL_OF_USERS } = require('../queries/users');
const {
  getUserRoles,
  getRoles,
  isAdmin,
  isWriter,
  isReader,
} = require('./permissions');

const { userTableFields, usersRolesTableFields } = require('./constants');

exports.createHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.isEmailUnique = async (email) => {
  const results = await db.query(GET_EMAIL_OF_USERS);
  if (results.rows.length === 0) {
    return true;
  }
  const emailList = results.rows.map((row) => row.email);
  return !emailList.includes(email);
};

exports.getWhereClauseParameters = (filterArray) => {
  if (!filterArray || !Array.isArray(filterArray) || filterArray.length === 0) {
    return '';
  }
  return `WHERE ${filterArray.join(' AND ')}`;
};

exports.getUserRoles = getUserRoles;
exports.getRoles = getRoles;
exports.isAdmin = isAdmin;
exports.isWriter = isWriter;
exports.isReader = isReader;

exports.userTableFields = userTableFields;
exports.usersRolesTableFields = usersRolesTableFields;
