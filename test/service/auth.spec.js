const passport = require('passport');
const auth = require('../../service/auth');
const util = require('../../util');

const mockRequest = (query, params, body, session, isAuthenticated) => ({
  query,
  params,
  body,
  session,
  isAuthenticated: () => isAuthenticated,
  logout: jest.fn(),
});
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Auth Service Tests', () => {
  describe('Testing login', () => {
    it('Should handle the authenticated user', async () => {
      const req = mockRequest(
        {},
        {},
        { username: 'test', password: 'test' },
        { userId: 0, roles: [] },
        true
      );
      const res = mockResponse();
      const error = null;
      const user = {
        user_id: 1,
      };
      const info = {};
      jest.spyOn(util, 'getUserRoles').mockReturnValue([1, 2, 3]);
      await auth.handleAuthenticatedUser(req, res, error, user, info);
      expect(res.json).toHaveBeenCalledWith({ user });
    });
    it('Should handle the error', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const error = 'Error';
      const user = {};
      const info = {};
      jest.spyOn(util, 'getUserRoles').mockReturnValue([1, 2, 3]);
      await auth.handleAuthenticatedUser(req, res, error, user, info);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error });
    });
    it('Should handle the missing user', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const error = null;
      const user = null;
      const info = {
        message: 'User not found',
      };
      jest.spyOn(util, 'getUserRoles').mockReturnValue([1, 2, 3]);
      await auth.handleAuthenticatedUser(req, res, error, user, info);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: info.message });
    });
    it('Should login the user', async () => {
      const req = mockRequest(
        {},
        {},
        { username: 'test', password: 'test' },
        { userId: 0, roles: [] },
        true
      );
      const res = mockResponse();
      const next = jest.fn();
      passport.authenticate = jest.fn((authType, options, callback) => () => ({
        authType,
        options,
        callback,
      }));
      await auth.login(req, res, next);
      expect(passport.authenticate).toHaveBeenCalled();
    });
  });
  describe('Testing the unauthorized service', () => {
    it('Should return unauthorized', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const message = 'You are not authorized to access this application';
      await auth.unauthorized(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
  describe('Testing the logout service', () => {
    it('Should handle logout', async () => {
      const res = mockResponse();
      const next = jest.fn();
      const message = 'You have successfully logged out of the application';
      await auth.handleLogout(1, null, res, next);
      expect(res.json).toHaveBeenCalledWith({ message });
    });
    it('Should handle logout error', async () => {
      const res = mockResponse();
      const next = jest.fn();
      await auth.handleLogout(1, 'error', res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should call logout callback', async () => {
      const req = mockRequest(
        {},
        {},
        { username: 'test', password: 'test' },
        { userId: 0, roles: [] },
        true,
        jest.fn(() => () => ({}))
      );
      const res = mockResponse();
      const next = jest.fn();
      const logoutSpy = jest.spyOn(req, 'logout');
      await auth.logout(req, res, next);
      expect(logoutSpy).toHaveBeenCalled();
    });
  });
});
