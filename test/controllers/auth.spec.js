const authService = require('../../service').auth;
const { login, unauthorized, logout } = require('../../controllers/auth');

const mockRequest = (query, params, body, session) => ({
  query,
  params,
  body,
  session,
});
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Auth Controllers Tests', () => {
  describe('Testing login', () => {
    it('Should return status', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      const next = jest.fn();
      jest.spyOn(authService, 'login');
      await login(req, res, next);
      expect(authService.login).toHaveBeenCalledWith(req, res, next);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      const next = jest.fn();
      jest.spyOn(authService, 'login').mockImplementation(() => {
        throw error;
      });
      await login(req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing unauthorized', () => {
    it('Should return status', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(authService, 'unauthorized');
      await unauthorized(req, res);
      expect(authService.unauthorized).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(authService, 'unauthorized').mockImplementation(() => {
        throw error;
      });
      await unauthorized(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing unauthorized', () => {
    it('Should return logout', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(authService, 'logout');
      await logout(req, res);
      expect(authService.logout).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(authService, 'logout').mockImplementation(() => {
        throw error;
      });
      await logout(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
