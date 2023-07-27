const passport = require('passport');
const router = require('express').Router();
const { isAuthenticated } = require('../config/passport');
const middlware = require('../middleware');

const {
  statusController,
  authController,
  usersController,
} = require('../controllers');

const { logApiTransaction } = middlware.logging;

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
router.put('/users/:userId', isAuthenticated, usersController.updateUser);
router.delete('/users/:userId', isAuthenticated, usersController.deleteUser);

module.exports = router;
