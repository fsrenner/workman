const bcrypt = require('bcrypt');
const db = require('../db');
const config = require('../config');
const queries = require('../queries/users');

exports.createHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.isEmailUnique = async (email) => {
  const results = await db.query(queries.GET_EMAIL_OF_USERS);
  const emailList = results.rows.map((row) => row.email);
  return emailList.includes(email);
};
