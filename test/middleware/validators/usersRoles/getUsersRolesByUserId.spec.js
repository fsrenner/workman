const getUsersRolesByUserIdValidator = require('../../../../middleware/validators/usersRoles/getUsersRolesByUserId');

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

describe('Get Users Roles By User Id Validator Test', () => {
  describe('Testing the getUsersRolesByUserId Validator', () => {
    it('Should verify the schema of the getUsersRolesByUserId request', async () => {
      const req = mockRequest({}, { userId: 1 }, {}, {});
      const res = mockResponse();
      getUsersRolesByUserIdValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the getUsersRolesByUserId request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      getUsersRolesByUserIdValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
