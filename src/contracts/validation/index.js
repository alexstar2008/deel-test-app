const { validate, Joi } = require('express-validation');

module.exports = {
  getContractById: validate({
    params: Joi.object().keys({
      id: Joi.number().integer().positive().required(),
    }),
    headers: Joi.object()
      .keys({
        profile_id: Joi.number().integer().positive().required(),
      })
      .unknown(),
  }),
  getContracts: validate({
    headers: Joi.object()
      .keys({
        profile_id: Joi.number().integer().positive().required(),
      })
      .unknown(),
  }),
};
