const { canUpdate } = require('../../middleware/permissions');

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
    it('Should return next: user is reader, but the same as updater', () => {
      const req = mockRequest({}, { userId: 4 }, {}, { userId: 4, roles: [3] });
      const res = mockResponse();
      const next = jest.fn();
      canUpdate(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
