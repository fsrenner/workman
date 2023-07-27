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

exports.createHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.isEmailUnique = async (email) => {
  const results = await db.query(GET_EMAIL_OF_USERS);
  const emailList = results.rows.map((row) => row.email);
  return emailList.includes(email);
};

exports.getUserRoles = getUserRoles;
exports.getRoles = getRoles;
exports.isAdmin = isAdmin;
exports.isWriter = isWriter;
exports.isReader = isReader;
