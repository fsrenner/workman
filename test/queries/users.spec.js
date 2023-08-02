const {
  GET_USERS,
  GET_USER_BY_ID,
  VERIFY_USER,
  CREATE_USER,
  DELETE_USER,
} = require('../../queries/users');

describe('Queries Test', () => {
  describe('Testing the User Queries', () => {
    it('Should verify the queries are defined', async () => {
      expect(GET_USERS).toBeDefined();
      expect(GET_USER_BY_ID).toBeDefined();
      expect(VERIFY_USER).toBeDefined();
      expect(CREATE_USER).toBeDefined();
      expect(DELETE_USER).toBeDefined();
    });
  });
});
