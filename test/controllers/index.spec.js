const {
  usersController,
  authController,
  statusController,
} = require('../../controllers');

describe('Services Test', () => {
  describe('Testing the Service Module Imports', () => {
    it('Should import the service modules', async () => {
      expect(usersController).toBeDefined();
      expect(authController).toBeDefined();
      expect(statusController).toBeDefined();
    });
  });
});
