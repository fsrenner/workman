const statusController = require('./status');
const authController = require('./auth');
const usersController = require('./users');
const usersRolesController = require('./usersRoles');
const churchesController = require('./churches');
const churchUsersController = require('./churchUsers');
const businessesController = require('./businesses');

module.exports = {
  statusController,
  authController,
  usersController,
  usersRolesController,
  churchesController,
  churchUsersController,
  businessesController,
};
