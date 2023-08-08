const Joi = require('joi');

const schema = Joi.object().keys({
  id: Joi.number(),
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
  createdDate: Joi.date(),
  createdBy: Joi.date(),
  updatedDate: Joi.date(),
  updatedBy: Joi.date(),
  sort: Joi.string().min(5).max(20),
  limit: Joi.number(),
  offset: Joi.number(),
});

module.exports = async (req, res, next) => {
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error });
  }
  return next();
};
