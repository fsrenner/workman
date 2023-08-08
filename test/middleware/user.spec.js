const db = require('../../db');
const { doesUserExist } = require('../../middleware/user');
const { getUsers } = require('../service/helpers/usersHelpers');

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

describe('Users Middleware Tests', () => {
  describe('Testing doesUserExist', () => {
    it('should return next: params defined', async () => {
      const req = mockRequest({}, { userId: 2 }, {}, {});
      const res = mockResponse();
      const next = jest.fn();
      jest.spyOn(db, 'query').mockReturnValue(getUsers);
      await doesUserExist(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('should return next: body defined', async () => {
      const req = mockRequest({}, {}, { userId: 2 }, {});
      const res = mockResponse();
      const next = jest.fn();
      jest.spyOn(db, 'query').mockReturnValue(getUsers);
      await doesUserExist(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('should return bad response: no user provided', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      const next = jest.fn();
      jest.spyOn(db, 'query').mockReturnValue(getUsers);
      await doesUserExist(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it('should return not found', async () => {
      const req = mockRequest({}, {}, { userId: 2 }, {});
      const res = mockResponse();
      const next = jest.fn();
      jest.spyOn(db, 'query').mockReturnValue({ rows: [] });
      await doesUserExist(req, res, next);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
