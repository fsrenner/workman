const passport = require('passport');
const router = require('express').Router();
const { isAuthenticated } = require('../config/passport');
const {
  notFound,
  serverError,
  validators,
  logging: { logApiTransaction },
  permissions: {
    canAdminister,
    canRead,
    canUpdate,
    canUpdateUser,
    canReadUser,
  },
  user: { doesUserExist },
} = require('../middleware');

const {
  statusController,
  authController,
  usersController,
  usersRolesController,
  churchesController,
  churchUsersController,
  businessesController,
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
  [isAuthenticated, canReadUser, validators.getUsers],
  usersController.getUsers
);
router.get(
  '/users/:userId',
  [isAuthenticated, canReadUser, validators.getUserById],
  usersController.getUserById
);
router.post('/users', [validators.createUser], usersController.createUser);
router.post(
  '/users/verify/:userId',
  validators.verifyUser,
  usersController.verifyUser
);
router.put(
  '/users/:userId',
  [isAuthenticated, canUpdateUser, validators.updateUser],
  usersController.updateUser
);
router.delete(
  '/users/:userId',
  [isAuthenticated, canUpdateUser, validators.deleteUser, doesUserExist],
  usersController.deleteUser
);

// Users Roles Controllers
router.get(
  '/usersroles',
  [isAuthenticated, canRead, validators.getUsersRoles],
  usersRolesController.getUsersRoles
);

router.get(
  '/usersroles/:id',
  [isAuthenticated, canRead, validators.getUsersRolesById],
  usersRolesController.getUsersRolesById
);

router.get(
  '/usersroles/user/:userId',
  [isAuthenticated, canRead, validators.getUsersRolesByUserId],
  usersRolesController.getUsersRolesByUserId
);

router.post(
  '/usersroles',
  [isAuthenticated, canAdminister, validators.createUsersRoles, doesUserExist],
  usersRolesController.createUsersRoles
);
router.delete(
  '/usersroles/:id',
  [isAuthenticated, canAdminister, validators.deleteUsersRolesById],
  usersRolesController.deleteUsersRolesById
);
router.delete(
  '/usersroles/user/:userId',
  [isAuthenticated, canAdminister, validators.deleteUsersRolesByUserId],
  usersRolesController.deleteUsersRolesByUserId
);
router.delete(
  '/usersroles/user/:userId/role/:roleId',
  [
    isAuthenticated,
    canAdminister,
    validators.deleteUsersRolesByUserIdAndRoleId,
  ],
  usersRolesController.deleteUsersRolesByUserIdAndRoleId
);

// Churches Controllers
router.get(
  '/churches',
  [validators.getChurches],
  churchesController.getChurches
);
router.get(
  '/churches/:id',
  [validators.getChurchById],
  churchesController.getChurchById
);
router.post(
  '/churches',
  [isAuthenticated, validators.createChurch],
  churchesController.createChurch
);
router.put(
  '/churches/:id',
  [isAuthenticated, canUpdate, validators.updateChurch],
  churchesController.updateChurch
);
router.delete(
  '/churches/:id',
  [isAuthenticated, canUpdate, validators.deleteChurch],
  churchesController.deleteChurch
);

// Church Users Controllers
router.get(
  '/churchusers',
  [isAuthenticated, canRead, validators.getChurchUsers],
  churchUsersController.getChurchUsers
);
router.get(
  '/churchusers/:id',
  [isAuthenticated, canRead, validators.getChurchUsersById],
  churchUsersController.getChurchUsersById
);
router.get(
  '/churchusers/user/:userId',
  [isAuthenticated, canRead, validators.getChurchUsersByUserId],
  churchUsersController.getChurchUsersByUserId
);
router.get(
  '/churchusers/church/:churchId',
  [isAuthenticated, canRead, validators.getChurchUsersByChurchId],
  churchUsersController.getChurchUsersByChurchId
);
router.post(
  '/churchusers',
  [isAuthenticated, canUpdateUser, validators.createChurchUser],
  churchUsersController.createChurchUser
);
router.delete(
  '/churchusers/:id',
  [isAuthenticated, canUpdateUser, validators.updateChurchUser],
  churchUsersController.deleteChurchUsersById
);
router.delete(
  '/churchusers/user/:userId',
  [isAuthenticated, canUpdateUser, validators.deleteChurchUserById],
  churchUsersController.deleteChurchUsersByUserId
);
router.delete(
  '/churchusers/church/:churchId',
  [isAuthenticated, canUpdateUser, validators.deleteChurchUserByChurchId],
  churchUsersController.deleteChurchUsersByChurchId
);
router.delete(
  '/churchusers/user/:userId/church/:churchId',
  [
    isAuthenticated,
    canUpdateUser,
    validators.deleteChurchUserByUserIdAndChurchId,
  ],
  churchUsersController.deleteChurchUsersByUserIdAndChurchId
);

// Businesses Controllers
router.get(
  '/businesses',
  [validators.getBusinesses],
  businessesController.getBusinesses
);
router.get(
  '/businesses/:id',
  [validators.getBusinessById],
  businessesController.getBusinessById
);
router.post(
  '/businesses',
  [isAuthenticated, validators.createBusiness],
  businessesController.createBusiness
);
router.put(
  '/businesses/:id',
  [isAuthenticated, canUpdate, validators.updateBusiness],
  businessesController.updateBusiness
);
router.delete(
  '/businesses/:id',
  [isAuthenticated, canUpdate, validators.deleteBusiness],
  businessesController.deleteBusiness
);

router.use(notFound);
router.use(serverError);

module.exports = router;
