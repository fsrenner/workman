const createChurchValidator = require('../../../../middleware/validators/churches/createChurch');

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

describe('Verify Church Validator Test', () => {
  describe('Testing the createChurch Validator', () => {
    it('Should verify the schema of the createChurch request', async () => {
      const req = mockRequest(
        {},
        {},
        {
          name: 'test',
          email: 'test@test.com',
          denomination: 'test',
          description: 'test',
          phone: 9876543210,
          address: '123 test st',
          city: 'test',
          state: 'MO',
          zip: 77777,
          country: 'test',
        },
        {}
      );
      const res = mockResponse();
      await createChurchValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the createChurch request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      await createChurchValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
