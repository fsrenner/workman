/* eslint-disable no-param-reassign */
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

const epochFromDateString = (d) => {
  let date;
  if (typeof d === 'string') {
    date = new Date(d);
  } else {
    date = d;
  }
  return (date.getTime() - date.getMilliseconds()) / 1000;
};

const dateFromEpoch = (epoch) => {
  const date = new Date(epoch * 1000);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

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

exports.getDateFromEpoch = (epoch) => dateFromEpoch(epoch);

exports.getEpochFromDateString = (d) => epochFromDateString(d);

exports.convertUserDateFields = (rows) =>
  rows.map((row) => {
    if (row) {
      if (row.date_of_birth) {
        row.date_of_birth = dateFromEpoch(row.date_of_birth);
      }
      if (row.updated_date) {
        row.updated_date = dateFromEpoch(row.updated_date);
      }
      if (row.created_date) {
        row.created_date = dateFromEpoch(row.created_date);
      }
    }
    return row;
  });

exports.convertDateMetaFields = (rows) =>
  rows.map((row) => {
    if (row) {
      if (row.updated_date) {
        row.updated_date = dateFromEpoch(row.updated_date);
      }
      if (row.created_date) {
        row.created_date = dateFromEpoch(row.created_date);
      }
    }
    return row;
  });

exports.getUserRoles = getUserRoles;
exports.getRoles = getRoles;
exports.isAdmin = isAdmin;
exports.isWriter = isWriter;
exports.isReader = isReader;

exports.userTableFields = userTableFields;
exports.usersRolesTableFields = usersRolesTableFields;
