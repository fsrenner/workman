const db = require('../../db');
const { sendStatus, sayHello } = require('../../controllers/status');

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

describe('Status Controllers Tests', () => {
  describe('Testing sendStatus', () => {
    it('Should return status', async () => {
      const req = mockRequest({ test: 'test' }, {}, { dude: 'abides' }, {});
      const res = mockResponse();
      jest.spyOn(db, 'query').mockReturnValue({ rows: [] });
      await sendStatus(req, res);
      expect(res.json).toHaveBeenCalledWith({
        status: 'The application is up and running on localhost:3001.',
        dbTime: [],
        body: { dude: 'abides' },
        query: { test: 'test' },
      });
    });
  });
  describe('Testing sayHello', () => {
    it('Should return hello params', async () => {
      const req = mockRequest({}, { hello: 'dude' }, {}, {});
      const res = mockResponse();
      await sayHello(req, res);
      expect(res.json).toHaveBeenCalledWith({
        hello: 'Hello dude',
      });
    });
  });
});
