const updateBusinessValidator = require('../../../../middleware/validators/businesses/updateBusiness');

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

describe('Update Business Validator Test', () => {
  describe('Testing the updateBusiness Validator', () => {
    it('Should verify the schema of the updateBusiness request', async () => {
      const req = mockRequest(
        {},
        { id: 1 },
        {
          name: 'test',
          email: 'test@test.com',
          description: 'test',
          phone: 9876543210,
          address: '123 test st',
          city: 'test',
          state: 'MO',
          zip: 77777,
        },
        {}
      );
      const res = mockResponse();
      updateBusinessValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the updateBusiness request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      updateBusinessValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
