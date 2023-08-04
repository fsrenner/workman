const userService = require('../../service').users;
const {
  getUsers,
  getUserById,
  createUser,
  verifyUser,
  updateUser,
  deleteUser,
} = require('../../controllers/users');

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

describe('Users Controllers Tests', () => {
  describe('Testing getUsers', () => {
    it('Should return user', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      userService.getUsers = jest.fn();
      await getUsers(req, res);
      expect(userService.getUsers).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(userService, 'getUsers').mockImplementation(() => {
        throw error;
      });
      await getUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing getUserById', () => {
    it('Should return user', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      userService.getUserById = jest.fn();
      await getUserById(req, res);
      expect(userService.getUserById).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(userService, 'getUserById').mockImplementation(() => {
        throw error;
      });
      await getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing createUser', () => {
    it('Should return user', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      userService.createUser = jest.fn();
      await createUser(req, res);
      expect(userService.createUser).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(userService, 'createUser').mockImplementation(() => {
        throw error;
      });
      await createUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing verifyUser', () => {
    it('Should return user', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      userService.verifyUser = jest.fn();
      await verifyUser(req, res);
      expect(userService.verifyUser).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(userService, 'verifyUser').mockImplementation(() => {
        throw error;
      });
      await verifyUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing updateUser', () => {
    it('Should return user', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      userService.updateUser = jest.fn();
      await updateUser(req, res);
      expect(userService.updateUser).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(userService, 'updateUser').mockImplementation(() => {
        throw error;
      });
      await updateUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing deleteUser', () => {
    it('Should return user', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      userService.deleteUser = jest.fn();
      await deleteUser(req, res);
      expect(userService.deleteUser).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(userService, 'deleteUser').mockImplementation(() => {
        throw error;
      });
      await deleteUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
