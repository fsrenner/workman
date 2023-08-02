const { Pool } = require('pg');
const config = require('../config');

const query = async (sql, values, pool) => {
  const queryParams = {
    text: sql,
    values: values || [],
  };
  const finalPool = pool || new Pool(config.db);
  const results = await finalPool.query(queryParams);
  await finalPool.end();
  return results;
};

const getPool = (dbConfig) => new Pool(dbConfig || config.db);

module.exports = {
  query,
  getPool,
};
