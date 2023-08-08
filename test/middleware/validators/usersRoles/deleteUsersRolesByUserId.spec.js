const deleteUsersRolesByUserIdValidator = require('../../../../middleware/validators/usersRoles/deleteUsersRolesByUserId');

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

describe('Delete Users Roles By User Id Validator Test', () => {
  describe('Testing the deleteUsersRolesByUserId Validator', () => {
    it('Should verify the schema of the deleteUsersRolesByUserId request', async () => {
      const req = mockRequest({}, { userId: 1 }, {}, {});
      const res = mockResponse();
      deleteUsersRolesByUserIdValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the deleteUsersRolesByUserId request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      deleteUsersRolesByUserIdValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
