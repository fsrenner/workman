const Joi = require('joi');
const { alphaNumSpaceDash } = require('../../../util/constants');

const bodySchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  firstName: Joi.string().alphanum().min(3).max(30),
  lastName: Joi.string().alphanum().min(3).max(30),
  dob: Joi.date(),
  phone: Joi.number().max(19999999999),
  address: Joi.string().pattern(alphaNumSpaceDash).min(3).max(50),
  city: Joi.string().pattern(alphaNumSpaceDash).min(3).max(30),
  state: Joi.string().uppercase().length(2),
  zip: Joi.number().max(99999),
  verified: Joi.boolean(),
});

const paramsSchema = Joi.object().keys({
  userId: Joi.number().required(),
});

module.exports = async (req, res, next) => {
  const bodyError = bodySchema.validate(req.body);
  const paramsError = paramsSchema.validate(req.params);
  if (bodyError.error || paramsError.error) {
    return res.status(400).json({
      error: {
        body: bodyError.error,
        params: paramsError.error,
      },
    });
  }
  return next();
};
