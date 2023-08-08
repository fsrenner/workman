const verifyUserValidator = require('../../../../middleware/validators/users/verifyUser');

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

describe('Verify User Validator Test', () => {
  describe('Testing the verifyUser Validator', () => {
    it('Should verify the schema of the verifyUser request', async () => {
      const req = mockRequest({}, { userId: 1 }, {}, {});
      const res = mockResponse();
      verifyUserValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the verifyUser request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      verifyUserValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
