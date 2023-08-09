// Auth Validators
const login = require('./auth/login');

// User Validators
const getUsers = require('./users/getUsers');
const getUserById = require('./users/getUserById');
const verifyUser = require('./users/verifyUser');
const createUser = require('./users/createUser');
const updateUser = require('./users/updateUser');
const deleteUser = require('./users/deleteUser');

// Users Roles Validators
const getUsersRoles = require('./usersRoles/getUsersRoles');
const getUsersRolesById = require('./usersRoles/getUsersRolesById');
const getUsersRolesByUserId = require('./usersRoles/getUsersRolesByUserId');
const createUsersRoles = require('./usersRoles/createUsersRoles');
const deleteUsersRolesById = require('./usersRoles/deleteUsersRolesById');
const deleteUsersRolesByUserId = require('./usersRoles/deleteUsersRolesByUserId');
const deleteUsersRolesByUserIdAndRoleId = require('./usersRoles/deleteUsersRolesByUserIdAndRoleId');

// Church Validators
const getChurches = require('./churches/getChurches');
const getChurchById = require('./churches/getChurchById');
const createChurch = require('./churches/createChurch');
const updateChurch = require('./churches/updateChurch');
const deleteChurch = require('./churches/deleteChurch');

module.exports = {
  login,
  getUsers,
  getUserById,
  verifyUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersRoles,
  getUsersRolesById,
  getUsersRolesByUserId,
  createUsersRoles,
  deleteUsersRolesById,
  deleteUsersRolesByUserId,
  deleteUsersRolesByUserIdAndRoleId,
  getChurches,
  getChurchById,
  createChurch,
  updateChurch,
  deleteChurch,
};
