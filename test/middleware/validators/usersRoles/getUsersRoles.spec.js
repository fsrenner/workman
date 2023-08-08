const getUsersRolesValidator = require('../../../../middleware/validators/usersRoles/getUsersRoles');

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

describe('Get Users Roles Validator Test', () => {
  describe('Testing the getUsersRoles Validator', () => {
    it('Should verify the schema of the getUsersRoles request', async () => {
      const req = mockRequest(
        {
          id: 1,
          userId: 1,
          roleId: 1,
          limit: 20,
          offset: 10,
        },
        {},
        {},
        {}
      );
      const res = mockResponse();
      getUsersRolesValidator(req, res, next);
      expect(next).toHaveBeenCalled();
    });
    it('Should verify the schema of the getUsersRoles request', async () => {
      const req = mockRequest({ test: 'test' }, {}, {}, {});
      const res = mockResponse();
      getUsersRolesValidator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
