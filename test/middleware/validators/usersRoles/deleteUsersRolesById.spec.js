const deleteUsersRolesByIdValidator = require('../../../../middleware/validators/usersRoles/deleteUsersRolesById');

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

describe('Delete Users Roles By Id Validator Test', () => {
  describe('Testing the deleteUsersRolesById Validator', () => {
    it('Should verify the schema of the deleteUsersRolesById request', async () => {
      const req = mockRequest({}, { id: 1 }, {}, {});
      const res = mockResponse();
      deleteUsersRolesByIdValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the deleteUsersRolesById request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      deleteUsersRolesByIdValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
