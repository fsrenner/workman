const { users, email, auth, usersRoles } = require('../../service');

describe('Services Test', () => {
  describe('Testing the Service Module Imports', () => {
    it('Should import the service modules', async () => {
      expect(users).toBeDefined();
      expect(auth).toBeDefined();
      expect(email).toBeDefined();
      expect(usersRoles).toBeDefined();
    });
  });
});
