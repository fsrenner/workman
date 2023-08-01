const sinon = require('sinon');
const db = require('../../db');
const { getUsers } = require('./helpers/usersHelpers');
const { users } = require('../../service');

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

describe('Users Service Tests', () => {
  describe('Testing getUsers', () => {
    it('Should return an array of users without filtering', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getUsers);
      const getUsersResult = {
        users: getUsers.rows,
      };
      await users.getUsers(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersResult);
    });
    it('Should return an array of users with filtering', async () => {
      const queryParams = {
        id: 1,
        username: 'DudeAbides',
        email: 'test@abc.com',
        firstName: 'Dude',
        lastName: 'Abides',
        dob: '01/01/1900',
        phone: '9876543210',
        address: '123 Main St',
        city: 'Normal',
        state: 'IL',
        zip: 60010,
        country: 'USA',
        lastLogin: null,
        createdDate: '2023-07-31 15:40:00.198068',
        createdBy: 1,
        updatedDate: null,
        updatedBy: null,
        verified: true,
        sort: 'email asc',
        limit: 5,
        offset: 5,
      };
      const req = mockRequest(queryParams, {}, {}, {});
      const res = mockResponse();
      getUsers.rows = getUsers.rows.filter((row) => row.user_id === 1);
      jest.spyOn(db, 'query').mockReturnValue(getUsers);
      const getUsersResult = {
        users: getUsers.rows,
      };
      await users.getUsers(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersResult);
    });
  });
  describe('Testing getUsersById', () => {
    it('Should return a user with id 1', async () => {
      const req = mockRequest({}, { userId: 1 }, {}, {});
      const res = mockResponse();
      getUsers.rows = getUsers.rows.filter((row) => row.user_id === 1);
      jest.spyOn(db, 'query').mockReturnValue(getUsers);
      const getUsersResult = {
        users: getUsers.rows[0],
      };
      await users.getUserById(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersResult);
    });
  });
  describe('Testing createUser', () => {
    it('Should create a new User', async () => {
      const bodyParams = {
        username: 'test',
        email: 'test@test.com',
        password: 'test',
        firstName: 'test',
        lastName: 'test',
        dob: '01/01/1900',
        phone: 'test',
        address: 'test',
        city: 'test',
        state: 'test',
        zip: 60010,
      };
      const req = mockRequest({}, {}, bodyParams, { userId: 1 });
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getUsers);
      await users.createUser(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('Testing verifyUser', () => {
    it('Should verify a new User email', async () => {
      const req = mockRequest({}, { userId: 1 }, {}, {});
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getUsers);
      const message = {
        users: `User : 1 email verfication was successful`,
      };
      await users.verifyUser(req, res);
      expect(res.json).toHaveBeenCalledWith(message);
    });
    it('Should return bad request for missing id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      const message = {
        message: 'The user id was missing from the request',
      };
      await users.verifyUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(message);
    });
  });
  describe('Testing updateUser', () => {
    it('Should update an existing User', async () => {
      const bodyParams = {
        username: 'test',
        email: 'test@test.com',
        password: 'test',
        firstName: 'test',
        lastName: 'test',
        dob: '01/01/1900',
        phone: 'test',
        address: 'test',
        city: 'test',
        state: 'test',
        zip: 60010,
        country: 'USA',
        verified: true,
      };
      const req = mockRequest({}, { userId: 1 }, bodyParams, {
        userId: 1,
        roles: [1, 2, 3],
      });
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getUsers);
      const getUsersResult = {
        users: getUsers.rows[0],
      };
      await users.updateUser(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersResult);
    });
  });
  describe('Testing deleteUser', () => {
    it('Should delete an existing User', async () => {
      const req = mockRequest(
        {},
        { userId: 1 },
        {},
        {
          userId: 1,
          roles: [1, 2, 3],
        }
      );
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getUsers);
      const message = {
        users: `User: 1 was successfully deleted`,
      };
      await users.deleteUser(req, res);
      expect(res.json).toHaveBeenCalledWith(message);
    });
  });
});
