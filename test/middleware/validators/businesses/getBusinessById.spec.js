const getBusinessByIdValidator = require('../../../../middleware/validators/businesses/getBusinessById');

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

describe('Get Businesss By Id Validator Test', () => {
  describe('Testing the getBusinessById Validator', () => {
    it('Should verify the schema of the getBusinessById request', async () => {
      const req = mockRequest({}, { id: 1 }, {}, {});
      const res = mockResponse();
      getBusinessByIdValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the getBusinessById request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      getBusinessByIdValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
