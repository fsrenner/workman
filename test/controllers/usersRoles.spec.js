const usersRolesService = require('../../service').usersRoles;
const {
  getUsersRoles,
  getUsersRolesById,
  getUsersRolesByUserId,
  createUsersRoles,
  deleteUsersRolesById,
  deleteUsersRolesByUserId,
  deleteUsersRolesByUserIdAndRoleId,
} = require('../../controllers/usersRoles');

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

describe('Users Roles Controllers Tests', () => {
  describe('Testing getUsersRoles', () => {
    it('Should return users roles', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      usersRolesService.getUsersRoles = jest.fn();
      await getUsersRoles(req, res);
      expect(usersRolesService.getUsersRoles).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(usersRolesService, 'getUsersRoles').mockImplementation(() => {
        throw error;
      });
      await getUsersRoles(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing getUsersRolesById', () => {
    it('Should return users roles by users roles id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      usersRolesService.getUsersRolesById = jest.fn();
      await getUsersRolesById(req, res);
      expect(usersRolesService.getUsersRolesById).toHaveBeenCalledWith(
        req,
        res
      );
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(usersRolesService, 'getUsersRolesById')
        .mockImplementation(() => {
          throw error;
        });
      await getUsersRolesById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing getUsersRolesByUserId', () => {
    it('Should return users roles by user id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      usersRolesService.getUsersRolesByUserId = jest.fn();
      await getUsersRolesByUserId(req, res);
      expect(usersRolesService.getUsersRolesByUserId).toHaveBeenCalledWith(
        req,
        res
      );
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(usersRolesService, 'getUsersRolesByUserId')
        .mockImplementation(() => {
          throw error;
        });
      await getUsersRolesByUserId(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing createUsersRoles', () => {
    it('Should return user', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      usersRolesService.createUsersRoles = jest.fn();
      await createUsersRoles(req, res);
      expect(usersRolesService.createUsersRoles).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(usersRolesService, 'createUsersRoles')
        .mockImplementation(() => {
          throw error;
        });
      await createUsersRoles(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing deleteUsersRolesById', () => {
    it('Should delete users roles by user role id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      usersRolesService.deleteUsersRolesById = jest.fn();
      await deleteUsersRolesById(req, res);
      expect(usersRolesService.deleteUsersRolesById).toHaveBeenCalledWith(
        req,
        res
      );
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(usersRolesService, 'deleteUsersRolesById')
        .mockImplementation(() => {
          throw error;
        });
      await deleteUsersRolesById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing deleteUsersRolesByUserId', () => {
    it('Should delete users roles by user id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      usersRolesService.deleteUsersRolesByUserId = jest.fn();
      await deleteUsersRolesByUserId(req, res);
      expect(usersRolesService.deleteUsersRolesByUserId).toHaveBeenCalledWith(
        req,
        res
      );
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(usersRolesService, 'deleteUsersRolesByUserId')
        .mockImplementation(() => {
          throw error;
        });
      await deleteUsersRolesByUserId(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing deleteUsersRolesByUserIdAndRoleId', () => {
    it('Should delete users roles by user id and role id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      usersRolesService.deleteUsersRolesByUserIdAndRoleId = jest.fn();
      await deleteUsersRolesByUserIdAndRoleId(req, res);
      expect(
        usersRolesService.deleteUsersRolesByUserIdAndRoleId
      ).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(usersRolesService, 'deleteUsersRolesByUserIdAndRoleId')
        .mockImplementation(() => {
          throw error;
        });
      await deleteUsersRolesByUserIdAndRoleId(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
