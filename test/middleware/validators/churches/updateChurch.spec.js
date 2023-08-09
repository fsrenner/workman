const updateChurchValidator = require('../../../../middleware/validators/churches/updateChurch');

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

describe('Update Church Validator Test', () => {
  describe('Testing the updateChurch Validator', () => {
    it('Should verify the schema of the updateChurch request', async () => {
      const req = mockRequest(
        {},
        { id: 1 },
        {
          name: 'test',
          email: 'test@test.com',
          description: 'test',
          denomination: 'test',
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
      updateChurchValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the updateChurch request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      updateChurchValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
