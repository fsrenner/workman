const passport = require('passport');
const router = require('express').Router();
const { isAuthenticated } = require('../config/passport');
const {
  notFound,
  serverError,
  logging: { logApiTransaction },
  permissions: { canUpdate },
} = require('../middleware');

const {
  statusController,
  authController,
  usersController,
} = require('../controllers');

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
  [isAuthenticated, canUpdate],
  usersController.deleteUser
);

router.use(notFound);
router.use(serverError);

module.exports = router;
