const Joi = require('joi');

const schema = Joi.object().keys({
  params: Joi.object().keys({
    userId: Joi.number().required(),
    roleId: Joi.number().required(),
  }),
});

module.exports = async (req, res, next) => {
  const { error } = schema.validate(req);
  if (error) {
    return res.status(400).json({ error });
  }
  return next();
};
