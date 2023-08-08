const loginValidator = require('../../../../middleware/validators/auth/login');

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

describe('Loging Validator Test', () => {
  describe('Testing the Login Validator', () => {
    it('Should verify the schema of the login request', async () => {
      const req = mockRequest(
        {},
        {},
        {
          username: 'test',
          password: 'test',
        },
        {}
      );
      const res = mockResponse();
      loginValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the login request', async () => {
      const req = mockRequest(
        {},
        {},
        {
          username: '',
          password: '',
        },
        {}
      );
      const res = mockResponse();
      loginValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
