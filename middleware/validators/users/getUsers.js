const Joi = require('joi');

const {
  alphaNumSpaceDash,
  phone,
  zip,
  dob,
} = require('../../../util/constants');

const schema = Joi.object().keys({
  id: Joi.number(),
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  firstName: Joi.string().pattern(alphaNumSpaceDash).min(3).max(30),
  lastName: Joi.string().pattern(alphaNumSpaceDash).min(3).max(30),
  dob: Joi.string().pattern(dob).allow('', null),
  phone: Joi.alternatives().try(
    Joi.number().max(9999999999),
    Joi.string().pattern(phone).length(10).allow('', null)
  ),
  address: Joi.string().pattern(alphaNumSpaceDash).min(3).max(50),
  city: Joi.string().pattern(alphaNumSpaceDash).min(3).max(30),
  state: Joi.string().uppercase().length(2),
  zip: Joi.alternatives().try(
    Joi.number().max(99999),
    Joi.string().pattern(zip).length(5).allow('', null)
  ),
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
