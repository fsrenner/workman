const Joi = require('joi');
const { alphaNumSpaceDash, phone, zip } = require('../../../util/constants');

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().pattern(alphaNumSpaceDash).min(3).max(30).required(),
  lastName: Joi.string().pattern(alphaNumSpaceDash).min(3).max(30).required(),
  dob: Joi.string().allow('', null),
  phone: Joi.alternatives().try(
    Joi.number().max(9999999999),
    Joi.string().pattern(phone).length(10).allow('', null)
  ),
  address: Joi.string().pattern(alphaNumSpaceDash).allow('', null),
  city: Joi.string().pattern(alphaNumSpaceDash).allow('', null),
  state: Joi.string().uppercase().length(2).allow('', null),
  zip: Joi.alternatives().try(
    Joi.number().max(99999),
    Joi.string().pattern(zip).length(5).allow('', null)
  ),
});

module.exports = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  return next();
};
