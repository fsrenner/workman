const { isAdmin, isWriter, isReader } = require('../util');

// Can perform the operations of an admin
const canAdminister = (req, res, next) => {
  const { userId, roles } = req.session;
  if (userId && roles && isAdmin(roles)) {
    return next();
  }
  return res.status(403).json({
    message: 'You are not permitted to perform this operation',
  });
};

// Can perform the operations of a manager
const canUpdate = (req, res, next) => {
  const { userId, roles } = req.session;
  if (userId && roles && (isWriter(roles) || isAdmin(roles))) {
    return next();
  }
  return res.status(403).json({
    message: 'You are not permitted to perform this operation',
  });
};

// Can perform the operations of a reader
const canRead = (req, res, next) => {
  const { userId, roles } = req.session;
  if (
    userId &&
    roles &&
    (isReader(roles) || isWriter(roles) || isAdmin(roles))
  ) {
    return next();
  }
  return res.status(403).json({
    message: 'You are not permitted to perform this operation',
  });
};

// Has write priviledges for a user: it is the user's own account or writer
const canUpdateUser = (req, res, next) => {
  const { userId, roles } = req.session;
  const id = req.params.userId;
  if (userId && roles && (userId === id || isWriter(roles) || isAdmin(roles))) {
    return next();
  }
  return res.status(403).json({
    message: 'You are not permitted to perform this operation',
  });
};

// Has read priviledges for a user: it is the user's own account or reader
const canReadUser = (req, res, next) => {
  const { userId, roles } = req.session;
  const id = req.params.userId;
  if (
    userId &&
    roles &&
    (userId === id || isReader(roles) || isWriter(roles) || isAdmin(roles))
  ) {
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
  canUpdateUser,
  canReadUser,
};
