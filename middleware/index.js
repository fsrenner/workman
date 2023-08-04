const logging = require('./logging');
const permissions = require('./permissions');
const user = require('./user');

const notFound = (req, res, next) => {
  const error = new Error('Not found');
  error.statusCode = 404;
  next(error);
};

const serverError = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  const name = err.name || 'Server Error';
  return res.status(statusCode).json({ name, message: err.message });
};

module.exports = {
  notFound,
  serverError,
  logging,
  permissions,
  user,
};
