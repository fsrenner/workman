const getChurchUsersValidator = require('../../../../middleware/validators/churchUsers/getChurchUsers');

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

describe('Get Church Users Validator Test', () => {
  describe('Testing the getChurchUsers Validator', () => {
    it('Should verify the schema of the getChurchUsers request', async () => {
      const req = mockRequest(
        {
          id: 1,
          userId: 1,
          churchId: 1,
          limit: 20,
          offset: 10,
        },
        {},
        {},
        {}
      );
      const res = mockResponse();
      getChurchUsersValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the getChurchUsers request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      getChurchUsersValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
