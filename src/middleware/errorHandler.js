const { StatusCodes } = require('http-status-codes');
const { ValidationError } = require('express-validation');
const { HttpError, AppError } = require('../errors');

// eslint-disable-next-line
const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const message = `Validation Error. ${err.details.params.map((p) => p.message).join(' ')}`;
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: message || err,
    });
  }
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || err,
    });
  }

  if (err instanceof AppError) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: err.message || err,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
};
module.exports = { errorHandler };
