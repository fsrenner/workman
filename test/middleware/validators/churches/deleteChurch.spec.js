const deleteChurchValidator = require('../../../../middleware/validators/churches/deleteChurch');

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

describe('Delete Church By Id Validator Test', () => {
  describe('Testing the deleteChurch Validator', () => {
    it('Should verify the schema of the deleteChurch request', async () => {
      const req = mockRequest({}, { id: 1 }, {}, {});
      const res = mockResponse();
      deleteChurchValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the deleteChurch request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      deleteChurchValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
