const db = require('../../db');
const { getUsersRoles } = require('./helpers/usersRolesHelpers');
const { usersRoles } = require('../../service');

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

describe('Users Roles Service Tests', () => {
  describe('Testing getUsersRoles', () => {
    it('Should return an array of users without filtering', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getUsersRoles);
      const getUsersRolesResult = {
        usersRoles: getUsersRoles.rows,
      };
      await usersRoles.getUsersRoles(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersRolesResult);
    });
    it('Should return an array of users with filtering', async () => {
      const req = mockRequest(
        {
          id: 1,
          userId: 1,
          roleId: 1,
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
      const mockResult = getUsersRoles.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getUsersRolesResult = {
        usersRoles: mockResult,
      };
      await usersRoles.getUsersRoles(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersRolesResult);
    });
  });
  describe('Testing getUsersRolesById', () => {
    it('Should return the users roles by user role id', async () => {
      const req = mockRequest({}, { id: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getUsersRoles.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getUsersRolesResult = {
        usersRoles: mockResult,
      };
      await usersRoles.getUsersRolesById(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersRolesResult);
    });
  });
  describe('Testing getUsersRolesByUserId', () => {
    it('Should return the users roles by user role id', async () => {
      const req = mockRequest({}, { userId: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getUsersRoles.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getUsersRolesResult = {
        usersRoles: mockResult,
      };
      await usersRoles.getUsersRolesByUserId(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersRolesResult);
    });
  });
  describe('Testing createUsersRoles', () => {
    it('Should create new users roles', async () => {
      const req = mockRequest(
        {},
        {},
        { userId: 1, roleId: [1] },
        { userId: 1 }
      );
      const res = mockResponse();
      const mockResult = getUsersRoles.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getUsersRolesResult = {
        usersRoles: mockResult,
      };
      await usersRoles.createUsersRoles(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersRolesResult);
    });
  });

  describe('Testing deleteUsersRolesById', () => {
    it('Should delete the users roles by user role id', async () => {
      const req = mockRequest({}, { id: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getUsersRoles.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getUsersRolesResult = {
        usersRoles: 'Users Role: 1 was successfully deleted from users roles',
      };
      await usersRoles.deleteUsersRolesById(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersRolesResult);
    });
  });
  describe('Testing deleteUsersRolesByUserId', () => {
    it('Should delete the users roles by user id', async () => {
      const req = mockRequest({}, { userId: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getUsersRoles.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getUsersRolesResult = {
        usersRoles: 'User: 1 was successfully deleted from users roles',
      };
      await usersRoles.deleteUsersRolesByUserId(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersRolesResult);
    });
  });
  describe('Testing deleteUsersRolesByUserIdAndRoleId', () => {
    it('Should delete the users roles by user id and role id', async () => {
      const req = mockRequest({}, { userId: 1, roleId: 1 }, {}, {});
      const res = mockResponse();
      const mockResult = getUsersRoles.rows.filter(
        (row) => row.user_role_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue({ rows: mockResult });
      const getUsersRolesResult = {
        usersRoles:
          'User: 1 with Role: 1 was successfully deleted from users roles',
      };
      await usersRoles.deleteUsersRolesByUserIdAndRoleId(req, res);
      expect(res.json).toHaveBeenCalledWith(getUsersRolesResult);
    });
  });
});
