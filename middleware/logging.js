const logger = require('../logger');

const logApiTransaction = (req, res, next) => {
  logger.debug(
    `${req.protocol} ${req.method} request made from ${req.hostname} and ip ${
      req.ip
    } to path ${req.path} using original url ${
      req.originalUrl
    } with content-type ${req.get('content-type')}`
  );
  next();
};

module.exports = {
  logApiTransaction,
};
