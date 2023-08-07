const Joi = require('joi');

const schema = Joi.object().keys({
  body: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    dob: Joi.date(),
    phone: Joi.number().max(19999999999),
    address: Joi.string().alphanum().min(3).max(50),
    city: Joi.string().alphanum().min(3).max(30),
    state: Joi.string().uppercase().length(2),
    zip: Joi.number().max(99999),
    country: Joi.string().alphanum().min(3).max(30),
  }),
});

module.exports = async (req, res, next) => {
  const { error } = schema.validate(req);
  if (error) {
    return res.status(400).json({ error });
  }
  return next();
};
