const Joi = require('joi');

const schema = Joi.object().keys({
  query: Joi.object().keys({
    id: Joi.number(),
    userId: Joi.number(),
    roleId: Joi.number(),
    createdDate: Joi.date(),
    createdBy: Joi.date(),
    updatedDate: Joi.date(),
    updatedBy: Joi.date(),
    sort: Joi.string().min(5).max(20),
    limit: Joi.number(),
    offset: Joi.number(),
  }),
});

module.exports = async (req, res, next) => {
  const { error } = schema.validate(req);
  if (error) {
    return res.status(400).json({ error });
  }
  return next();
};
