const churchService = require('../../service').churches;
const {
  getChurches,
  getChurchById,
  createChurch,
  updateChurch,
  deleteChurch,
} = require('../../controllers/churches');

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

describe('Churches Controllers Tests', () => {
  describe('Testing getChurches', () => {
    it('Should return churches', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchService.getChurches = jest.fn();
      await getChurches(req, res);
      expect(churchService.getChurches).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(churchService, 'getChurches').mockImplementation(() => {
        throw error;
      });
      await getChurches(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing getChurchById', () => {
    it('Should return church by id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchService.getChurchById = jest.fn();
      await getChurchById(req, res);
      expect(churchService.getChurchById).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(churchService, 'getChurchById').mockImplementation(() => {
        throw error;
      });
      await getChurchById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing createChurch', () => {
    it('Should create church', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchService.createChurch = jest.fn();
      await createChurch(req, res);
      expect(churchService.createChurch).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(churchService, 'createChurch').mockImplementation(() => {
        throw error;
      });
      await createChurch(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing updateChurch', () => {
    it('Should update church', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchService.updateChurch = jest.fn();
      await updateChurch(req, res);
      expect(churchService.updateChurch).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(churchService, 'updateChurch').mockImplementation(() => {
        throw error;
      });
      await updateChurch(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing deleteChurch', () => {
    it('Should delete church', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      churchService.deleteChurch = jest.fn();
      await deleteChurch(req, res);
      expect(churchService.deleteChurch).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(churchService, 'deleteChurch').mockImplementation(() => {
        throw error;
      });
      await deleteChurch(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
