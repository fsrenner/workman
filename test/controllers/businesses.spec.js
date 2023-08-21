const businessService = require('../../service').businesses;
const {
  getBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} = require('../../controllers/businesses');

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

describe('Businesses Controllers Tests', () => {
  describe('Testing getBusinesses', () => {
    it('Should return businesses', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      businessService.getBusinesses = jest.fn();
      await getBusinesses(req, res);
      expect(businessService.getBusinesses).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(businessService, 'getBusinesses').mockImplementation(() => {
        throw error;
      });
      await getBusinesses(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing getBusinessById', () => {
    it('Should return business by id', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      businessService.getBusinessById = jest.fn();
      await getBusinessById(req, res);
      expect(businessService.getBusinessById).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(businessService, 'getBusinessById').mockImplementation(() => {
        throw error;
      });
      await getBusinessById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing createBusiness', () => {
    it('Should create business', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      businessService.createBusiness = jest.fn();
      await createBusiness(req, res);
      expect(businessService.createBusiness).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(businessService, 'createBusiness').mockImplementation(() => {
        throw error;
      });
      await createBusiness(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing updateBusiness', () => {
    it('Should update business', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      businessService.updateBusiness = jest.fn();
      await updateBusiness(req, res);
      expect(businessService.updateBusiness).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(businessService, 'updateBusiness').mockImplementation(() => {
        throw error;
      });
      await updateBusiness(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe('Testing deleteBusiness', () => {
    it('Should delete business', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      businessService.deleteBusiness = jest.fn();
      await deleteBusiness(req, res);
      expect(businessService.deleteBusiness).toHaveBeenCalledWith(req, res);
    });
    it('Should return server error', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(businessService, 'deleteBusiness').mockImplementation(() => {
        throw error;
      });
      await deleteBusiness(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
