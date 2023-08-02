const db = require('../db');
const logger = require('../logger');
const { GET_USER_ROLES } = require('../queries/users_roles');

const getUsersRoles = async (req, res) => {
  const results = await db.query(GET_USER_ROLES);
  return res.json({ usersRoles: results.rows });
};

module.exports = {
  getUsersRoles,
};
