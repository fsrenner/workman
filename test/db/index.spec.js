const { Pool } = require('pg');
const { query, getPool } = require('../../db');

describe('Database Module Tests', () => {
  describe('Testing db', () => {
    it('Should return db and run query', async () => {
      const pool = getPool();
      const text = 'testing';
      const values = [1];
      const results = { rows: [] };
      const querySpy = jest.spyOn(pool, 'query').mockReturnValue(results);
      const response = await query(text, values, pool);
      expect(response).toBe(results);
      expect(querySpy).toHaveBeenCalledWith({ text, values });
    });
  });
});
