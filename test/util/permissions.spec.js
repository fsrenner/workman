const db = require('../../db');
const {
  getRoles,
  getUserRoles,
  isAdmin,
  isWriter,
  isReader,
} = require('../../util');

describe('Util Permissions Tests', () => {
  describe('Testing getRoles', () => {
    it('Should fetch the roles', async () => {
      jest.spyOn(db, 'query').mockReturnValue({
        rows: [
          { role_id: 1, role_name: 'ADMIN' },
          { role_id: 2, role_name: 'MANAGER' },
          { role_id: 3, role_name: 'READER' },
        ],
      });
      const roles = await getRoles();
      expect(roles.length).toEqual(3);
    });
  });
  describe('Testing getUserRoles', () => {
    it('Should fetch the roles for a user', async () => {
      jest.spyOn(db, 'query').mockReturnValue({
        rows: [
          { user_role_id: 1, role_id: 1, user_id: 1 },
          { user_role_id: 2, role_id: 2, user_id: 1 },
        ],
      });
      const userRoles = await getUserRoles(1);
      expect(userRoles[1]).toEqual(2);
    });
  });
  describe('Testing isAdmin', () => {
    it('Should return admin is true', (done) => {
      expect(isAdmin([1, 2, 3])).toBeTruthy();
      done();
    });
    it('Should return admin is false', (done) => {
      expect(isAdmin([])).toBeFalsy();
      done();
    });
    it('Should handle missing roles', (done) => {
      expect(isAdmin(null)).toBeFalsy();
      done();
    });
  });
  describe('Testing isWriter', () => {
    it('Should return writer is true', (done) => {
      expect(isWriter([2, 3])).toBeTruthy();
      done();
    });
    it('Should return writer is false', (done) => {
      expect(isWriter([])).toBeFalsy();
      done();
    });
    it('Should handle missing roles', (done) => {
      expect(isWriter(null)).toBeFalsy();
      done();
    });
  });
  describe('Testing isReader', () => {
    it('Should return reader is true', (done) => {
      expect(isReader([3])).toBeTruthy();
      done();
    });
    it('Should return reader is true', (done) => {
      expect(isReader([])).toBeFalsy();
      done();
    });
    it('Should handle missing roles', (done) => {
      expect(isReader(null)).toBeFalsy();
      done();
    });
  });
});
