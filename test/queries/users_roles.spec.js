const {
  GET_USER_ROLES,
  GET_USERS_ROLES_BY_ID,
  CREATE_USERS_ROLES,
  DELETE_USERS_ROLES_BY_ID,
  DELETE_USERS_ROLES_BY_USER_ID,
  DELETE_USERS_ROLES_BY_USER_ID_AND_ROLE_ID,
} = require('../../queries/users_roles');

describe('Queries Test', () => {
  describe('Testing the Users Roles Queries', () => {
    it('Should verify the queries are defined', async () => {
      expect(GET_USER_ROLES).toBeDefined();
      expect(GET_USERS_ROLES_BY_ID).toBeDefined();
      expect(CREATE_USERS_ROLES).toBeDefined();
      expect(DELETE_USERS_ROLES_BY_ID).toBeDefined();
      expect(DELETE_USERS_ROLES_BY_USER_ID).toBeDefined();
      expect(DELETE_USERS_ROLES_BY_USER_ID_AND_ROLE_ID).toBeDefined();
    });
  });
});
