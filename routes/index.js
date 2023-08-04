const passport = require('passport');
const router = require('express').Router();
const { isAuthenticated } = require('../config/passport');
const {
  notFound,
  serverError,
  logging: { logApiTransaction },
  permissions: { canUpdate },
  user: { doesUserExist },
} = require('../middleware');

const {
  statusController,
  authController,
  usersController,
  usersRolesController,
} = require('../controllers');
const { canRead, canAdminister } = require('../middleware/permissions');

router.use('/', logApiTransaction);

// Status Controllers
router.get('/status', statusController.sendStatus);
router.get('/status/:hello', statusController.sayHello);

// Auth Controllers
router.post('/login', passport.authenticate('local'), authController.login);
router.get('/unauthorized', authController.unauthorized);
router.post('/logout', isAuthenticated, authController.logout);

// Users Controllers
router.get('/users', isAuthenticated, usersController.getUsers);
router.get('/users/:userId', isAuthenticated, usersController.getUserById);
router.post('/users', usersController.createUser);
router.post('/users/verify/:userId', usersController.verifyUser);
router.put(
  '/users/:userId',
  [isAuthenticated, canUpdate],
  usersController.updateUser
);
router.delete(
  '/users/:userId',
  [isAuthenticated, canUpdate, doesUserExist],
  usersController.deleteUser
);

// Users Roles Controllers
router.get(
  '/usersroles',
  [isAuthenticated, canRead],
  usersRolesController.getUsersRoles
);

router.get(
  '/usersroles/:id',
  [isAuthenticated, canRead],
  usersRolesController.getUsersRolesById
);

router.get(
  '/usersroles/user/:userId',
  [isAuthenticated, canRead],
  usersRolesController.getUsersRolesByUserId
);

router.post(
  '/usersroles',
  [isAuthenticated, canAdminister, doesUserExist],
  usersRolesController.createUsersRoles
);
router.delete(
  '/usersroles/:id',
  [isAuthenticated, canAdminister],
  usersRolesController.deleteUsersRolesById
);
router.delete(
  '/usersroles/user/:userId',
  [isAuthenticated, canAdminister],
  usersRolesController.deleteUsersRolesByUserId
);
router.delete(
  '/usersroles/user/:userId/role/:roleId',
  [isAuthenticated, canAdminister],
  usersRolesController.deleteUsersRolesByUserIdAndRoleId
);

router.use(notFound);
router.use(serverError);

module.exports = router;
