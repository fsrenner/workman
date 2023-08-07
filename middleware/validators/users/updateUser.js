const Joi = require('joi');

const schema = Joi.object().keys({
  params: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    firstName: Joi.string().alphanum().min(3).max(30),
    lastName: Joi.string().alphanum().min(3).max(30),
    dob: Joi.date(),
    phone: Joi.number().max(19999999999),
    address: Joi.string().alphanum().min(3).max(50),
    city: Joi.string().alphanum().min(3).max(30),
    state: Joi.string().uppercase().length(2),
    zip: Joi.number().max(99999),
    country: Joi.string().alphanum().min(3).max(30),
    verified: Joi.boolean(),
  }),
});

module.exports = async (req, res, next) => {
  const { error } = schema.validate(req);
  if (error) {
    return res.status(400).json({ error });
  }
  return next();
};
