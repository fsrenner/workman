const statusController = require('./status');
const authController = require('./auth');
const usersController = require('./users');
const usersRolesController = require('./usersRoles');
const churchesController = require('./churches');
const churchUsersController = require('./churchUsers');

module.exports = {
  statusController,
  authController,
  usersController,
  usersRolesController,
  churchesController,
  churchUsersController,
};
