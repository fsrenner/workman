const createUsersRolesValidator = require('../../../../middleware/validators/usersRoles/createUsersRoles');

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

describe('Create Users Roles Validator Test', () => {
  describe('Testing the createUsersRoles Validator', () => {
    it('Should verify the schema of the createUsersRoles request', async () => {
      const req = mockRequest(
        {},
        {},
        {
          userId: 1,
          roleId: 1,
        },
        {}
      );
      const res = mockResponse();
      createUsersRolesValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the createUsersRoles request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      createUsersRolesValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
