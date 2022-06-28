const { StatusCodes } = require('http-status-codes');
const { ValidationError } = require('express-validation');
const { HttpError } = require('../errors');

const errorHandler = (err, req, res) => {
  if (err instanceof ValidationError || err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || err,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
};
module.exports = { errorHandler };
