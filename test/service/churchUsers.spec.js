const db = require('../../db');
const { getChurchUsers } = require('./helpers/churchUsersHelpers');
const { churchUsers } = require('../../service');

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

describe('Church Users Service Tests', () => {
  describe('Testing getChurchUsers', () => {
    it('Should return an array of church users without filtering', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getChurchUsers);
      const getChurchUsersResult = {
        churchUsers: getChurchUsers.rows,
      };
      await churchUsers.getChurchUsers(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchUsersResult);
    });
    it('Should return an array of church users with filtering', async () => {
      const req = mockRequest(
        {
          id: 1,
          userId: 1,
          churchId: 1,
          createdBy: 1,
          createdDate: '2023-07-31 15:40:00.198068',
          updatedBy: 1,
          updatedDate: '2023-07-31 15:40:00.198068',
          sort: 'userId asc',
          limit: 10,
          offset: 1,
        },
        {},
        {},
        {}
      );
      const res = mockResponse();
      const mockResult = getChurchUsers.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getChurchUsersResult = {
        churchUsers: mockResult,
      };
      await churchUsers.getChurchUsers(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchUsersResult);
    });
  });
  describe('Testing getChurchUsersById', () => {
    it('Should return the users roles by user role id', async () => {
      const req = mockRequest({}, { id: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getChurchUsers.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getChurchUsersResult = {
        churchUsers: mockResult[0],
      };
      await churchUsers.getChurchUsersById(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchUsersResult);
    });
  });
  describe('Testing getChurchUsersByUserId', () => {
    it('Should return the users roles by user id', async () => {
      const req = mockRequest({}, { userId: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getChurchUsers.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getChurchUsersResult = {
        churchUsers: mockResult,
      };
      await churchUsers.getChurchUsersByUserId(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchUsersResult);
    });
  });
  describe('Testing getChurchUsersByChurchId', () => {
    it('Should return the users roles by church id', async () => {
      const req = mockRequest({}, { church: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getChurchUsers.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getChurchUsersResult = {
        churchUsers: mockResult,
      };
      await churchUsers.getChurchUsersByChurchId(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchUsersResult);
    });
  });
  describe('Testing createChurchUsers', () => {
    it('Should create new users roles', async () => {
      const req = mockRequest(
        {},
        {},
        { userId: 1, churchId: 1 },
        { userId: 1 }
      );
      const res = mockResponse();
      const mockResult = getChurchUsers.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getChurchUsersResult = {
        churchUsers: mockResult,
      };
      await churchUsers.createChurchUser(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchUsersResult);
    });
  });

  describe('Testing deleteChurchUsersById', () => {
    it('Should delete the users roles by church user id', async () => {
      const req = mockRequest({}, { id: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getChurchUsers.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getChurchUsersResult = {
        churchUsers:
          'Church User: 1 was successfully deleted from church users',
      };
      await churchUsers.deleteChurchUsersById(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchUsersResult);
    });
  });
  describe('Testing deleteChurchUsersByUserId', () => {
    it('Should delete the church users by user id', async () => {
      const req = mockRequest({}, { userId: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getChurchUsers.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getChurchUsersResult = {
        churchUsers: 'User: 1 was successfully deleted from church users',
      };
      await churchUsers.deleteChurchUsersByUserId(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchUsersResult);
    });
  });
  describe('Testing deleteChurchUsersByChurchId', () => {
    it('Should delete the church users by church id', async () => {
      const req = mockRequest({}, { churchId: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getChurchUsers.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getChurchUsersResult = {
        churchUsers: 'Church: 1 was successfully deleted from church users',
      };
      await churchUsers.deleteChurchUsersByChurchId(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchUsersResult);
    });
  });
  describe('Testing deleteChurchUsersByUserIdAndChurchId', () => {
    it('Should delete the church users by user id and church id', async () => {
      const req = mockRequest({}, { userId: 1, churchId: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getChurchUsers.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getChurchUsersResult = {
        churchUsers:
          'User: 1 with Church: 1 was successfully deleted from church users',
      };
      await churchUsers.deleteChurchUsersByUserIdAndChurchId(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchUsersResult);
    });
  });
});
