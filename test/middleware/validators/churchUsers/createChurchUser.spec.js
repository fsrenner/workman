const createChurchUserValidator = require('../../../../middleware/validators/churchUsers/createChurchUser');

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

describe('Create Users Roles Validator Test', () => {
  describe('Testing the createChurchUser Validator', () => {
    it('Should verify the schema of the createChurchUser request', async () => {
      const req = mockRequest(
        {},
        {},
        {
          userId: 1,
          churchId: 1,
        },
        {}
      );
      const res = mockResponse();
      createChurchUserValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the createChurchUser request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      createChurchUserValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
