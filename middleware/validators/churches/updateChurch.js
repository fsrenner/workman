const Joi = require('joi');
const { alphaNumSpaceDash } = require('../../../util/constants');

const bodySchema = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(30),
  denomination: Joi.string().min(3).max(30),
  description: Joi.string().min(3).max(1000),
  email: Joi.string().email(),
  phone: Joi.number().max(9999999999),
  address: Joi.string().pattern(alphaNumSpaceDash).min(3).max(50),
  city: Joi.string().pattern(alphaNumSpaceDash).min(3).max(30),
  state: Joi.string().uppercase().length(2),
  zip: Joi.number().max(99999),
  country: Joi.string().alphanum().min(3).max(30),
});

const paramsSchema = Joi.object().keys({
  id: Joi.number().required(),
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
