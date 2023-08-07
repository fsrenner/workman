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
const validators = require('../middleware/validators');
const { canRead, canAdminister } = require('../middleware/permissions');

const {
  statusController,
  authController,
  usersController,
  usersRolesController,
} = require('../controllers');

router.use('/', logApiTransaction);

// Status Controllers
router.get('/status', statusController.sendStatus);
router.get('/status/:hello', statusController.sayHello);

// Auth Controllers
router.post(
  '/login',
  [validators.login, passport.authenticate('local')],
  authController.login
);
router.get('/unauthorized', authController.unauthorized);
router.post('/logout', isAuthenticated, authController.logout);

// Users Controllers
router.get(
  '/users',
  [isAuthenticated, validators.getUsers],
  usersController.getUsers
);
router.get(
  '/users/:userId',
  [isAuthenticated, validators.getUserById],
  usersController.getUserById
);
router.post('/users', validators.createUser, usersController.createUser);
router.post(
  '/users/verify/:userId',
  validators.verifyUser,
  usersController.verifyUser
);
router.put(
  '/users/:userId',
  [isAuthenticated, validators.updateUser, canUpdate],
  usersController.updateUser
);
router.delete(
  '/users/:userId',
  [isAuthenticated, validators.deleteUser, canUpdate, doesUserExist],
  usersController.deleteUser
);

// Users Roles Controllers
router.get(
  '/usersroles',
  [isAuthenticated, validators.getUsersRoles, canRead],
  usersRolesController.getUsersRoles
);

router.get(
  '/usersroles/:id',
  [isAuthenticated, validators.getUsersRolesById, canRead],
  usersRolesController.getUsersRolesById
);

router.get(
  '/usersroles/user/:userId',
  [isAuthenticated, validators.getUsersRolesByUserId, canRead],
  usersRolesController.getUsersRolesByUserId
);

router.post(
  '/usersroles',
  [isAuthenticated, validators.createUsersRoles, canAdminister, doesUserExist],
  usersRolesController.createUsersRoles
);
router.delete(
  '/usersroles/:id',
  [isAuthenticated, validators.deleteUsersRolesById, canAdminister],
  usersRolesController.deleteUsersRolesById
);
router.delete(
  '/usersroles/user/:userId',
  [isAuthenticated, validators.deleteUsersRolesByUserId, canAdminister],
  usersRolesController.deleteUsersRolesByUserId
);
router.delete(
  '/usersroles/user/:userId/role/:roleId',
  [
    isAuthenticated,
    validators.deleteUsersRolesByUserIdAndRoleId,
    canAdminister,
  ],
  usersRolesController.deleteUsersRolesByUserIdAndRoleId
);

router.use(notFound);
router.use(serverError);

module.exports = router;
