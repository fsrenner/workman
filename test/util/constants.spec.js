const { userTableFields, usersRolesTableFields } = require('../../util');

describe('Util Constants Tests', () => {
  describe('Testing the userTableFields constant', () => {
    it('Should verify the user table object constants', (done) => {
      const userTable = userTableFields;
      expect(userTable.id).toEqual('user_id');
      done();
    });
  });
  describe('Testing the userRolesTableFields constant', () => {
    it('Should verify the user roles table object constants', (done) => {
      const userRolesTable = usersRolesTableFields;
      expect(userRolesTable.roleId).toEqual('role_id');
      done();
    });
  });
});
