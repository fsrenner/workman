const getUsersValidator = require('../../../../middleware/validators/users/getUsers');

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

describe('Get Users Validator Test', () => {
  describe('Testing the getUsers Validator', () => {
    it('Should verify the schema of the getUsers request', async () => {
      const req = mockRequest(
        {
          id: 1,
          username: 'test',
          email: 'test@test.com',
        },
        {},
        {},
        {}
      );
      const res = mockResponse();
      getUsersValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the getUsers request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      getUsersValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
