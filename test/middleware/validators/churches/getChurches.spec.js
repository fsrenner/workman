const getChurchesValidator = require('../../../../middleware/validators/churches/getChurches');

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

const next = jest.fn();

describe('Get Churches Validator Test', () => {
  describe('Testing the getChurches Validator', () => {
    it('Should verify the schema of the getChurches request', async () => {
      const req = mockRequest(
        {
          id: 1,
          name: 'test',
          email: 'test@test.com',
        },
        {},
        {},
        {}
      );
      const res = mockResponse();
      getChurchesValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the getChurches request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      getChurchesValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
