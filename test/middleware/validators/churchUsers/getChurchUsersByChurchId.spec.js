const getChurchUsersByChurchIdValidator = require('../../../../middleware/validators/churchUsers/getChurchUsersByChurchId');

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
  describe('Testing the getChurchUsersByChurchIdValidator Validator', () => {
    it('Should verify the schema of the getChurchUsersByChurchIdValidator request', async () => {
      const req = mockRequest({}, { churchId: 1 }, {}, {});
      const res = mockResponse();
      getChurchUsersByChurchIdValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the getChurchUsersByChurchIdValidator request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      getChurchUsersByChurchIdValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
