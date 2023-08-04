const { isAdmin, isWriter, isReader } = require('../util');

const canAdminister = (req, res, next) => {
  const { userId, roles } = req.session;

  if (userId && roles && isAdmin(roles)) {
    return next();
  }
  return res.status(403).json({
    message: 'You are not permitted to perform this operation',
  });
};

const canUpdate = (req, res, next) => {
  const { userId, roles } = req.session;
  const id = req.params.userId;

  if (userId && roles && (userId === id || isWriter(roles))) {
    return next();
  }
  return res.status(403).json({
    message: 'You are not permitted to perform this operation',
  });
};

const canRead = (req, res, next) => {
  const { userId, roles } = req.session;
  const id = req.params.userId;

  if (userId && roles && (userId === id || isReader(roles))) {
    return next();
  }
  return res.status(403).json({
    message: 'You are not permitted to perform this operation',
  });
};

module.exports = {
  canUpdate,
  canAdminister,
  canRead,
};
