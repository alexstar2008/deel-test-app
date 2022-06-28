const { validate, Joi } = require('express-validation');

module.exports = {
  depositClientBalance: validate({
    params: Joi.object().keys({
      userId: Joi.number().positive().required(),
    }),
    body: Joi.object().keys({
      amount: Joi.number().positive().required(),
    }),
    headers: Joi.object()
      .keys({
        profile_id: Joi.number().integer().positive().required(),
      })
      .unknown(),
  }),
};
