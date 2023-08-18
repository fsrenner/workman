const churchUsersService = require('../../service').churchUsers;
const {
  getChurchUsers,
  getChurchUsersById,
  getChurchUsersByUserId,
  getChurchUsersByChurchId,
  createChurchUser,
  deleteChurchUsersById,
  deleteChurchUsersByUserId,
  deleteChurchUsersByChurchId,
  deleteChurchUsersByUserIdAndChurchId,
} = require('../../controllers/churchUsers');

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
  describe('Testing getChurchUsers', () => {
    it('Should return users roles', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchUsersService.getChurchUsers = jest.fn();
      await getChurchUsers(req, res);
      expect(churchUsersService.getChurchUsers).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(churchUsersService, 'getChurchUsers')
        .mockImplementation(() => {
          throw error;
        });
      await getChurchUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing getChurchUsersById', () => {
    it('Should return users roles by users roles id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchUsersService.getChurchUsersById = jest.fn();
      await getChurchUsersById(req, res);
      expect(churchUsersService.getChurchUsersById).toHaveBeenCalledWith(
        req,
        res
      );
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(churchUsersService, 'getChurchUsersById')
        .mockImplementation(() => {
          throw error;
        });
      await getChurchUsersById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing getChurchUsersByUserId', () => {
    it('Should return users roles by user id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchUsersService.getChurchUsersByUserId = jest.fn();
      await getChurchUsersByUserId(req, res);
      expect(churchUsersService.getChurchUsersByUserId).toHaveBeenCalledWith(
        req,
        res
      );
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(churchUsersService, 'getChurchUsersByUserId')
        .mockImplementation(() => {
          throw error;
        });
      await getChurchUsersByUserId(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing getChurchUsersByChurchId', () => {
    it('Should return users roles by user id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchUsersService.getChurchUsersByChurchId = jest.fn();
      await getChurchUsersByChurchId(req, res);
      expect(churchUsersService.getChurchUsersByChurchId).toHaveBeenCalledWith(
        req,
        res
      );
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(churchUsersService, 'getChurchUsersByChurchId')
        .mockImplementation(() => {
          throw error;
        });
      await getChurchUsersByChurchId(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing createChurchUser', () => {
    it('Should return user', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchUsersService.createChurchUser = jest.fn();
      await createChurchUser(req, res);
      expect(churchUsersService.createChurchUser).toHaveBeenCalledWith(
        req,
        res
      );
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(churchUsersService, 'createChurchUser')
        .mockImplementation(() => {
          throw error;
        });
      await createChurchUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing deleteChurchUsersById', () => {
    it('Should delete users roles by user role id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchUsersService.deleteChurchUsersById = jest.fn();
      await deleteChurchUsersById(req, res);
      expect(churchUsersService.deleteChurchUsersById).toHaveBeenCalledWith(
        req,
        res
      );
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(churchUsersService, 'deleteChurchUsersById')
        .mockImplementation(() => {
          throw error;
        });
      await deleteChurchUsersById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing deleteChurchUsersByUserId', () => {
    it('Should delete users roles by user id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchUsersService.deleteChurchUsersByUserId = jest.fn();
      await deleteChurchUsersByUserId(req, res);
      expect(churchUsersService.deleteChurchUsersByUserId).toHaveBeenCalledWith(
        req,
        res
      );
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(churchUsersService, 'deleteChurchUsersByUserId')
        .mockImplementation(() => {
          throw error;
        });
      await deleteChurchUsersByUserId(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing deleteChurchUsersByChurchId', () => {
    it('Should delete users roles by user id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchUsersService.deleteChurchUsersByChurchId = jest.fn();
      await deleteChurchUsersByChurchId(req, res);
      expect(
        churchUsersService.deleteChurchUsersByChurchId
      ).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(churchUsersService, 'deleteChurchUsersByChurchId')
        .mockImplementation(() => {
          throw error;
        });
      await deleteChurchUsersByChurchId(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing deleteChurchUsersByUserIdAndChurchId', () => {
    it('Should delete users roles by user id and role id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchUsersService.deleteChurchUsersByUserIdAndChurchId = jest.fn();
      await deleteChurchUsersByUserIdAndChurchId(req, res);
      expect(
        churchUsersService.deleteChurchUsersByUserIdAndChurchId
      ).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest
        .spyOn(churchUsersService, 'deleteChurchUsersByUserIdAndChurchId')
        .mockImplementation(() => {
          throw error;
        });
      await deleteChurchUsersByUserIdAndChurchId(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
