const Joi = require('joi');
const { alphaNumSpaceDash, phone, zip } = require('../../../util/constants');

const bodySchema = Joi.object().keys({
  name: Joi.string().pattern(alphaNumSpaceDash).min(3).max(30),
  denomination: Joi.string().min(3).max(30),
  description: Joi.string().min(3).max(1000),
  email: Joi.string().email(),
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
