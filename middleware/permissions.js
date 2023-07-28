const { isWriter } = require('../util');

const canUpdate = (req, res, next) => {
  const { userId, roles } = req.session;
  const id = req.params.userId;

  if (userId && roles && id && (userId === id || isWriter(req.session.roles))) {
    return next();
  }
  return res.status(403).json({
    message: 'You are not permitted to perform this operation',
  });
};

module.exports = {
  canUpdate,
};
