const Joi = require('joi');

const paramsSchema = Joi.object().keys({
  id: Joi.number(),
});

const bodySchema = Joi.object().keys({
  userId: Joi.number(),
  roleId: Joi.number(),
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
