const updateUserValidator = require('../../../../middleware/validators/users/updateUser');

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

describe('Update User Validator Test', () => {
  describe('Testing the updateUser Validator', () => {
    it('Should verify the schema of the updateUser request', async () => {
      const req = mockRequest(
        {},
        { userId: 1 },
        {
          username: 'test',
          email: 'test@test.com',
          password: 'test',
          firstName: 'test',
          lastName: 'test',
          dob: '12/13/2023',
          phone: 9876543210,
          address: '123 test st',
          city: 'test',
          state: 'MO',
          zip: 77777,
        },
        {}
      );
      const res = mockResponse();
      updateUserValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the updateUser request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      updateUserValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
