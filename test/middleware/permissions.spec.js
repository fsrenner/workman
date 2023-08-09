const {
  canUpdate,
  canRead,
  canAdminister,
  canUpdateUser,
  canReadUser,
} = require('../../middleware/permissions');

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

describe('Permissions Middleware Tests', () => {
  describe('Testing canAdminister', () => {
    it('Should return forbidden', () => {
      const req = mockRequest(
        {},
        { userId: 2 },
        {},
        { userId: 4, roles: [2, 3, 4] }
      );
      const res = mockResponse();
      const next = jest.fn();
      const response = {
        message: 'You are not permitted to perform this operation',
      };
      canAdminister(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(response);
    });
    it('Should return next: user admin', () => {
      const req = mockRequest(
        {},
        { userId: 2 },
        {},
        { userId: 4, roles: [1, 2, 3, 4] }
      );
      const res = mockResponse();
      const next = jest.fn();
      canAdminister(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('Testing canUpdate', () => {
    it('Should return forbidden', () => {
      const req = mockRequest({}, { userId: 2 }, {}, { userId: 4, roles: [3] });
      const res = mockResponse();
      const next = jest.fn();
      const response = {
        message: 'You are not permitted to perform this operation',
      };
      canUpdate(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(response);
    });
    it('Should return next: user is writer', () => {
      const req = mockRequest(
        {},
        { userId: 2 },
        {},
        { userId: 4, roles: [2, 3] }
      );
      const res = mockResponse();
      const next = jest.fn();
      canUpdate(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('Testing canRead', () => {
    it('Should return forbidden', () => {
      const req = mockRequest({}, { userId: 2 }, {}, { userId: 4, roles: [4] });
      const res = mockResponse();
      const next = jest.fn();
      const response = {
        message: 'You are not permitted to perform this operation',
      };
      canRead(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(response);
    });
    it('Should return next: user is reader or greater', () => {
      const req = mockRequest(
        {},
        { userId: 2 },
        {},
        { userId: 4, roles: [2, 3] }
      );
      const res = mockResponse();
      const next = jest.fn();
      canRead(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('Testing canUpdateUser', () => {
    it('Should return next: user is reader, but the same as updater', () => {
      const req = mockRequest({}, { userId: 4 }, {}, { userId: 4, roles: [3] });
      const res = mockResponse();
      const next = jest.fn();
      canUpdateUser(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should return next: user is admin', () => {
      const req = mockRequest({}, { userId: 3 }, {}, { userId: 4, roles: [1] });
      const res = mockResponse();
      const next = jest.fn();
      canUpdateUser(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should return forbidden', () => {
      const req = mockRequest({}, { userId: 2 }, {}, { userId: 4, roles: [4] });
      const res = mockResponse();
      const next = jest.fn();
      const response = {
        message: 'You are not permitted to perform this operation',
      };
      canUpdateUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(response);
    });
  });
  describe('Testing canReadUser', () => {
    it('Should return next: user is general user, but the same as updater', () => {
      const req = mockRequest({}, { userId: 4 }, {}, { userId: 4, roles: [4] });
      const res = mockResponse();
      const next = jest.fn();
      canReadUser(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should return next: user is admin', () => {
      const req = mockRequest({}, { userId: 3 }, {}, { userId: 4, roles: [1] });
      const res = mockResponse();
      const next = jest.fn();
      canReadUser(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should return forbidden', () => {
      const req = mockRequest({}, { userId: 2 }, {}, { userId: 4, roles: [4] });
      const res = mockResponse();
      const next = jest.fn();
      const response = {
        message: 'You are not permitted to perform this operation',
      };
      canReadUser(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(response);
    });
  });
});
