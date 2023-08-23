const db = require('../db');
const { GET_ROLES } = require('../queries/roles');
const { GET_USER_ROLES_BY_USER_ID } = require('../queries/users_roles');

const ADMIN = 1;
const MANAGER = 2;
const READER = 3;

const getRoles = async () => {
  const roles = await db.query(GET_ROLES);
  return roles.rows;
};

const getUserRoles = async (id) => {
  const { rows } = await db.query(GET_USER_ROLES_BY_USER_ID, [id]);
  const roles = rows.map((role) => role.role_id);
  return roles;
};

const isAdmin = (roles) => {
  if (!roles) {
    return false;
  }
  return roles.includes(ADMIN);
};

const isWriter = (roles) => {
  if (!roles) {
    return false;
  }
  return roles.includes(ADMIN) || roles.includes(MANAGER);
};

const isReader = (roles) => {
  if (!roles) {
    return false;
  }
  return (
    roles.includes(ADMIN) || roles.includes(MANAGER) || roles.includes(READER)
  );
};

module.exports = {
  getUserRoles,
  getRoles,
  isAdmin,
  isWriter,
  isReader,
};
