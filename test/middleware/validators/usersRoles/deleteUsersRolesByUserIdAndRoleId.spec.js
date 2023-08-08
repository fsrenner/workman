const deleteUsersRolesByUserIdAndRoleIdValidator = require('../../../../middleware/validators/usersRoles/deleteUsersRolesByUserIdAndRoleId');

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

describe('Delete Users Roles By User Id And Role Id Validator Test', () => {
  describe('Testing the deleteUsersRolesByUserIdAndRoleId Validator', () => {
    it('Should verify the schema of the deleteUsersRolesByUserIdAndRoleId request', async () => {
      const req = mockRequest({}, { userId: 1, roleId: 1 }, {}, {});
      const res = mockResponse();
      deleteUsersRolesByUserIdAndRoleIdValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the deleteUsersRolesByUserIdAndRoleId request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      deleteUsersRolesByUserIdAndRoleIdValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
