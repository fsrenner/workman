const { Pool } = require('pg');
const config = require('../config');

const query = async (sql, values) => {
  const pool = new Pool(config.db);
  // const results = !values ? await pool.query(sql, []) : await pool.query(sql, values);
  const results = await pool.query({
    text: sql,
    values: values || [],
  });
  await pool.end();
  return results;
};

module.exports = {
  query,
};
