const getUsersRolesByIdValidator = require('../../../../middleware/validators/usersRoles/getUsersRolesById');

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

describe('Get Users Roles By Id Validator Test', () => {
  describe('Testing the getUsersRolesById Validator', () => {
    it('Should verify the schema of the getUsersRolesById request', async () => {
      const req = mockRequest({}, { id: 1 }, {}, {});
      const res = mockResponse();
      getUsersRolesByIdValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the getUsersRolesById request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      getUsersRolesByIdValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
