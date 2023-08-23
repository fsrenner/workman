const db = require('../../db');
const {
  createHashedPassword,
  isEmailUnique,
  getWhereClauseParameters,
  getDateFromEpoch,
  getEpochFromDateString,
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
    it('Should verify that email is unique: no rows returned', async () => {
      jest.spyOn(db, 'query').mockReturnValue({
        rows: [],
      });
      const unique = await isEmailUnique('testing@testing.com');
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
    it('Should return empty string when no params provided', (done) => {
      const whereClause = getWhereClauseParameters([]);
      expect(whereClause).toEqual('');
      done();
    });
    it('Should return an epoch timestamp', (done) => {
      const dateString = '12-31-1999';
      const timestamp = 946620000;
      expect(getEpochFromDateString(dateString)).toEqual(timestamp);
      expect(getEpochFromDateString(new Date(dateString))).toEqual(timestamp);
      done();
    });
    it('Should return a date', (done) => {
      const dateString = '12-31-1999';
      const timestamp = 946620000;
      expect(getDateFromEpoch(timestamp)).toEqual(dateString);
      done();
    });
  });
});
