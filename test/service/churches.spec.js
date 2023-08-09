const db = require('../../db');
const { getChurches } = require('./helpers/churchesHelpers');
const { churches } = require('../../service');

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

describe('Churches Service Tests', () => {
  describe('Testing getChurches', () => {
    it('Should return an array of users', async () => {
      const req = mockRequest({}, {}, {}, {});
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getChurches);
      const getChurchesResult = {
        churches: getChurches.rows,
      };
      await churches.getChurches(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchesResult);
    });
    it('Should return an array of users with filtering ', async () => {
      const req = mockRequest(
        {
          church_id: 3,
          church_name: 'duder',
          denomination: 'PCUSA',
          description: 'dudette',
          email: 'PC@usa.com',
          phone_number: '1234567891',
          address: 'test',
          city: 'test',
          state: 'NY',
          zip: 12345,
          created_date: '2023-08-09T18:20:41.871Z',
          created_by: 1,
          updated_date: null,
          updated_by: null,
        },
        {},
        {},
        {}
      );
      const res = mockResponse();
      getChurches.rows = getChurches.rows.filter((row) => row.church_id === 3);
      jest.spyOn(db, 'query').mockReturnValue(getChurches);
      const getChurchesResult = {
        churches: getChurches.rows,
      };
      await churches.getChurches(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchesResult);
    });
  });
  describe('Testing getChurchById', () => {
    it('Should return a church with id 3', async () => {
      const req = mockRequest({}, { id: 3 }, {}, {});
      const res = mockResponse();
      getChurches.rows = getChurches.rows.filter((row) => row.church_id === 3);
      jest.spyOn(db, 'query').mockReturnValue(getChurches);
      const getChurchesResult = {
        churches: getChurches.rows[0],
      };
      await churches.getChurchById(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchesResult);
    });
  });
  describe('Testing createChurch', () => {
    it('Should return a church with id 3', async () => {
      const req = mockRequest(
        {},
        {},
        {
          church_name: 'duder',
          denomination: 'PCUSA',
          description: 'dudette',
          email: 'PC@usa.com',
          phone_number: '1234567891',
          address: 'test',
          city: 'test',
          state: 'NY',
          zip: 12345,
        },
        { userId: 1 }
      );
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getChurches);
      await churches.createChurch(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('Testing createChurch', () => {
    it('Should return a church with id 3', async () => {
      const req = mockRequest(
        {},
        { id: 3 },
        {
          church_name: 'duder',
          denomination: 'PCUSA',
          description: 'dudette',
          email: 'PC@usa.com',
          phone_number: '1234567891',
          address: 'test',
          city: 'test',
          state: 'NY',
          zip: 12345,
        },
        { userId: 1 }
      );
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getChurches);
      const getChurchResults = {
        churches: getChurches.rows[0],
      };
      await churches.updateChurch(req, res);
      expect(res.json).toHaveBeenCalledWith(getChurchResults);
    });
  });
  describe('Testing deleteChurch', () => {
    it('Should return a church with id 3', async () => {
      const req = mockRequest({}, { id: 3 }, {}, {});
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue(getChurches);
      await churches.deleteChurch(req, res);
      expect(res.json).toHaveBeenCalledWith({
        churches: 'Church: 3 was successfully deleted',
      });
    });
  });
});
