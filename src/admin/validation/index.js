const { validate, Joi } = require('express-validation');

module.exports = {
  getMostEarnedProfession: validate({
    query: Joi.object().keys({
      start: Joi.date(),
      end: Joi.date(),
    }),
  }),
  getMostPaidClients: validate({
    query: Joi.object().keys({
      start: Joi.date(),
      end: Joi.date(),
      limit: Joi.number().integer().positive(),
    }),
  }),
};
