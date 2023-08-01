const db = require('../../db');
const {
  createHashedPassword,
  isEmailUnique,
  getWhereClauseParameters,
} = require('../../util');

describe('Util Index Tests', () => {
  describe('Testing General Util Functions', () => {
    beforeEach(() => {
      jest.spyOn(db, 'query').mockReturnValue({
        rows: [{ email: 'f.steve.renner@hotmail.com' }],
      });
    });
    it('Should create a hashed password', async () => {
      const hashedPassword = await createHashedPassword('test');
      expect(hashedPassword.length).toBe(60);
    });
    it('Should verify that email is unique: false case', async () => {
      const unique = await isEmailUnique('f.steve.renner@hotmail.com');
      expect(unique).toBeFalsy();
    });
    it('Should verify that email is unique: true case', async () => {
      const unique = await isEmailUnique('test@test.burble');
      expect(unique).toBeTruthy();
    });
    it('Should create a WHERE clause string with parameters', (done) => {
      const whereClause = getWhereClauseParameters([
        'test1 = $1',
        'test2 = $2',
      ]);
      expect(whereClause).toEqual('WHERE test1 = $1 AND test2 = $2');
      done();
    });
  });
});
