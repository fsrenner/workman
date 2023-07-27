const config = require('../config');
const db = require('../db');

const sendStatus = async (req, res) => {
  const { body, query } = req;
  const result = await db.query('SELECT now();');
  return res.json({
    status: `The application is up and running on ${config.host}:${config.port}.`,
    dbTime: result.rows,
    body,
    query,
  });
};

const sayHello = (req, res) => {
  const { hello } = req.params;
  return res.json({
    hello: `Hello ${hello}`,
  });
};

module.exports = {
  sendStatus,
  sayHello,
};
