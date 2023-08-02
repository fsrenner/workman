const passport = require('passport');
const {
  handleAuthenticatedUser,
  login,
  unauthorized,
  logout,
} = require('../../service/auth');
const util = require('../../util');

const mockRequest = (query, params, body, session, isAuthenticated) => ({
  query,
  params,
  body,
  session,
  isAuthenticated: () => isAuthenticated,
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
        { id: 0, roles: [] },
        true
      );
      const res = mockResponse();
      const error = null;
      const user = {
        user_id: 1,
      };
      const info = {};
      jest.spyOn(util, 'getUserRoles').mockReturnValue([1, 2, 3]);
      await handleAuthenticatedUser(req, res, error, user, info);
      expect(res.json).toHaveBeenCalledWith({ user });
    });
    it('Should login the user', async () => {
      const req = mockRequest(
        {},
        {},
        { username: 'test', password: 'test' },
        { id: 0, roles: [] },
        true
      );
      const res = mockResponse();
      const next = jest.fn();
      passport.authenticate = jest.fn(
        (authType, options, callback) => () => ({})
      );
      await login(req, res, next);
      expect(passport.authenticate).toHaveBeenCalled();
    });
  });
});
