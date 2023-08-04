const db = require('../db');
const logger = require('../logger');
const { GET_USER_BY_ID } = require('../queries/users');

const doesUserExist = async (req, res, next) => {
  let message = '';
  const userId = req.params.userId ? req.params.userId : req.body.userId;
  if (!userId) {
    message = 'Cannot perform the requested operation. User id not provided.';
    logger.debug(message);
    return res.status(400).json({
      message,
    });
  }
  const findUser = await db.query(GET_USER_BY_ID, [userId]);
  if (findUser.rows.length === 0) {
    message = `Cannot perform the requested operation. User: ${userId} not found`;
    logger.debug(message);
    return res.status(404).json({
      message,
    });
  }
  return next();
};

module.exports = {
  doesUserExist,
};
