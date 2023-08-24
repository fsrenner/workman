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

// Church User Validators
const getChurchUsers = require('./churchUsers/getChurchUsers');
const getChurchUsersById = require('./churchUsers/getChurchUsersById');
const getChurchUsersByUserId = require('./churchUsers/getChurchUsersByUserId');
const getChurchUsersByChurchId = require('./churchUsers/getChurchUsersByChurchId');
const createChurchUser = require('./churchUsers/createChurchUser');
const deleteChurchUserById = require('./churchUsers/deleteChurchUserById');
const deleteChurchUserByUserId = require('./churchUsers/deleteChurchUserByUserId');
const deleteChurchUserByChurchId = require('./churchUsers/deleteChurchUserByChurchId');
const deleteChurchUserByUserIdAndChurchId = require('./churchUsers/deleteChurchUserByUserIdAndChurchId');

// Church Validators
const getBusinesses = require('./businesses/getBusinesses');
const getBusinessById = require('./businesses/getBusinessById');
const createBusiness = require('./businesses/createBusiness');
const updateBusiness = require('./businesses/updateBusiness');
const deleteBusiness = require('./businesses/deleteBusiness');

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
  getChurchUsers,
  getChurchUsersById,
  getChurchUsersByUserId,
  getChurchUsersByChurchId,
  createChurchUser,
  deleteChurchUserById,
  deleteChurchUserByUserId,
  deleteChurchUserByChurchId,
  deleteChurchUserByUserIdAndChurchId,
  getBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
