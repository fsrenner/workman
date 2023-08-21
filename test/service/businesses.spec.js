const db = require('../../db');
const { getBusinesses } = require('./helpers/businessesHelpers');
const { businesses } = require('../../service');

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

describe('Businesses Service Tests', () => {
  describe('Testing getBusinesses', () => {
    it('Should return an array of users', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getBusinesses);
      const getBusinessesResult = {
        businesses: getBusinesses.rows,
      };
      await businesses.getBusinesses(req, res);
      expect(res.json).toHaveBeenCalledWith(getBusinessesResult);
    });
    it('Should return an array of users with filtering ', async () => {
      const req = mockRequest(
        {
          id: 3,
          name: 'duder',
          description: 'dudette',
          email: 'PC@usa.com',
          phone: '1234567891',
          address: 'test',
          city: 'test',
          state: 'NY',
          zip: 12345,
          createdDate: '2023-08-09T18:20:41.871Z',
          createdBy: 1,
          updatedDate: '2023-08-09T18:20:41.871Z',
          updatedBy: 1,
          limit: 5,
          sort: 'name asc',
          offset: 5,
        },
        {},
        {},
        {}
      );
      const res = mockResponse();
      getBusinesses.rows = getBusinesses.rows.filter(
        (row) => row.business_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue(getBusinesses);
      const getBusinessesResult = {
        businesses: getBusinesses.rows,
      };
      await businesses.getBusinesses(req, res);
      expect(res.json).toHaveBeenCalledWith(getBusinessesResult);
    });
  });
  describe('Testing getBusinessById', () => {
    it('Should return a business with id 3', async () => {
      const req = mockRequest({}, { id: 3 }, {}, {});
      const res = mockResponse();
      getBusinesses.rows = getBusinesses.rows.filter(
        (row) => row.business_id === 1
      );
      jest.spyOn(db, 'query').mockReturnValue(getBusinesses);
      const getBusinessesResult = {
        businesses: getBusinesses.rows[0],
      };
      await businesses.getBusinessById(req, res);
      expect(res.json).toHaveBeenCalledWith(getBusinessesResult);
    });
  });
  describe('Testing createBusiness', () => {
    it('Should return a business with id 3', async () => {
      const req = mockRequest(
        {},
        {},
        {
          name: 'duder',
          denomination: 'PCUSA',
          description: 'dudette',
          email: 'PC@usa.com',
          phone: '1234567891',
          address: 'test',
          city: 'test',
          state: 'NY',
          zip: 12345,
        },
        { userId: 1 }
      );
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getBusinesses);
      await businesses.createBusiness(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('Testing createBusiness', () => {
    it('Should return a business with id 1', async () => {
      const req = mockRequest(
        {},
        { id: 1 },
        {
          name: 'duder',
          denomination: 'PCUSA',
          description: 'dudette',
          email: 'PC@usa.com',
          phone: '1234567891',
          address: 'test',
          city: 'test',
          state: 'NY',
          zip: 12345,
        },
        { userId: 1 }
      );
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getBusinesses);
      const getBusinessResults = {
        businesses: getBusinesses.rows[0],
      };
      await businesses.updateBusiness(req, res);
      expect(res.json).toHaveBeenCalledWith(getBusinessResults);
    });
  });
  describe('Testing deleteBusiness', () => {
    it('Should return a business with id 3', async () => {
      const req = mockRequest({}, { id: 1 }, {}, {});
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getBusinesses);
      await businesses.deleteBusiness(req, res);
      expect(res.json).toHaveBeenCalledWith({
        businesses: 'Business: 1 was successfully deleted',
      });
    });
  });
});
