const { StatusCodes } = require('http-status-codes');

class HttpError extends Error {
  constructor(statusCode, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }

    this.statusCode = statusCode;
    this.name = 'HttpError';
  }
}

class NotFoundError extends HttpError {
  constructor(...params) {
    super(StatusCodes.NOT_FOUND, ...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class UnauthorizedError extends HttpError {
  constructor(...params) {
    super(StatusCodes.UNAUTHORIZED, ...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class AppError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}

module.exports = {
  AppError,
  HttpError,
  NotFoundError,
  UnauthorizedError,
};
