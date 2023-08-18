const deleteChurchUserByUserIdValidator = require('../../../../middleware/validators/churchUsers/deleteChurchUserByUserId');

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

describe('Get Church Users By Id Validator Test', () => {
  describe('Testing the deleteChurchUserByUserIdValidator Validator', () => {
    it('Should verify the schema of the deleteChurchUserByUserIdValidator request', async () => {
      const req = mockRequest({}, { userId: 1 }, {}, {});
      const res = mockResponse();
      deleteChurchUserByUserIdValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the deleteChurchUserByUserIdValidator request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      deleteChurchUserByUserIdValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
