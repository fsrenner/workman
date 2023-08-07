const Joi = require('joi');

const schema = Joi.object().keys({
  body: Joi.object().keys({
    userId: Joi.number(),
    roleId: Joi.number(),
  }),
});

module.exports = async (req, res, next) => {
  const { error } = schema.validate(req);
  if (error) {
    return res.status(400).json({ error });
  }
  return next();
};