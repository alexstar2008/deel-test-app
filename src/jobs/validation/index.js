const { validate, Joi } = require('express-validation');

module.exports = {
  getActiveUnpaidJobs: validate({
    headers: Joi.object()
      .keys({
        profile_id: Joi.number().integer().positive().required(),
      })
      .unknown(),
  }),
  payJob: validate({
    params: Joi.object().keys({
      jobId: Joi.number().integer().positive().required(),
    }),
    headers: Joi.object()
      .keys({
        profile_id: Joi.number().integer().positive().required(),
      })
      .unknown(),
  }),
};
