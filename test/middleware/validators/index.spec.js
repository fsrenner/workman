const validators = require('../../../middleware/validators');

describe('Validators Tests', () => {
  describe('Testing Validators Imports', () => {
    it('Should not import undefined validators', () => {
      expect(validators).toBeDefined();
      expect(validators.login).toBeDefined();
      expect(validators.getUsers).toBeDefined();
      expect(validators.getUserById).toBeDefined();
      expect(validators.createUser).toBeDefined();
      expect(validators.updateUser).toBeDefined();
      expect(validators.deleteUser).toBeDefined();
      expect(validators.getUsersRoles).toBeDefined();
      expect(validators.getUsersRolesById).toBeDefined();
      expect(validators.getUsersRolesByUserId).toBeDefined();
      expect(validators.createUsersRoles).toBeDefined();
      expect(validators.deleteUsersRolesById).toBeDefined();
      expect(validators.deleteUsersRolesByUserId).toBeDefined();
      expect(validators.deleteUsersRolesByUserIdAndRoleId).toBeDefined();
    });
  });
});
