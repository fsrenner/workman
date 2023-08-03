const db = require('../../db');
const {
  serializeUser,
  deserializeUser,
  localStrategy,
  isAuthenticated,
} = require('../../config/passport');

const mockRequest = (query, params, body, session, authenticated) => ({
  query,
  params,
  body,
  session,
  isAuthenticated: () => authenticated,
  logout: jest.fn(),
});
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  return res;
};

describe('Passport Tests', () => {
  describe('Testing serializeUser', () => {
    it('Should serialize the provided user', () => {
      const user = {
        user_id: 1,
      };
      const done = jest.fn();
      serializeUser(user, done);
      expect(done).toHaveBeenCalledWith(null, user.user_id);
    });
  });
  describe('Testing deserializeUser', () => {
    it('Should deserialize the provided user id', async () => {
      const id = 1;
      const done = jest.fn();
      const user = {
        user_id: 1,
      };
      jest.spyOn(db, 'query').mockReturnValue({ rows: [user] });
      await deserializeUser(id, done);
      expect(done).toHaveBeenCalledWith(null, user);
    });
  });
  describe('Testing localStrategy', () => {
    it('Should successfully authenticate the user', async () => {
      const username = 'test';
      const password = 'test';
      const done = jest.fn();
      const user = {
        user_id: 1,
        password_hash:
          '$2a$10$c5573Vgm9QpprTeZEJdwNeyo7uqCLhk.5Ezwvt/TlAG8g5xNBnZgm',
      };
      jest.spyOn(db, 'query').mockReturnValue({ rows: [user] });
      await localStrategy(username, password, done);
      delete user.password_hash;
      expect(done).toHaveBeenCalledWith(null, user);
    });
    it('Should fail to find user', async () => {
      const username = 'test';
      const password = 'test';
      const done = jest.fn();
      jest.spyOn(db, 'query').mockReturnValue({ rows: [] });
      await localStrategy(username, password, done);
      expect(done).toHaveBeenCalledWith(null, false, {
        message: 'There is no user found with the username: test',
      });
    });
    it('Should fail to verify password', async () => {
      const username = 'test';
      const password = 'test';
      const done = jest.fn();
      const user = {
        user_id: 1,
        password_hash: 'test',
      };
      jest.spyOn(db, 'query').mockReturnValue({ rows: [user] });
      await localStrategy(username, password, done);
      expect(done).toHaveBeenCalledWith(null, false, {
        message:
          'The password entered is incorrect for user with username: test',
      });
    });
    it('Should handle thrown error', async () => {
      const username = 'test';
      const password = 'test';
      const done = jest.fn();
      const error = new Error('Database error');
      jest.spyOn(db, 'query').mockImplementation(() => {
        throw error;
      });
      await localStrategy(username, password, done);
      expect(done).toHaveBeenCalledWith(error, false, {
        message: 'There was a problem looking up the user in the database: {}',
      });
    });
  });
  describe('Testing serializeUser', () => {
    it('Should should allow access', () => {
      const req = mockRequest({}, {}, {}, { userId: 1 }, true);
      const res = mockResponse();
      const next = jest.fn();
      isAuthenticated(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should should not allow access', () => {
      const req = mockRequest({}, {}, {}, { userId: 1 }, false);
      const res = mockResponse();
      const next = jest.fn();
      isAuthenticated(req, res, next);
      expect(res.redirect).toHaveBeenCalledWith('/unauthorized');
    });
  });
});
