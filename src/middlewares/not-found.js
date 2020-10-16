const { AppError } = require('../utils/errors');

function notFoundHandler(req, res, next) {
  const err = new AppError({
    status: 404,
    code: 4000,
    message: `Route not found ::: URL : ${req.originalUrl}`
  });

  next(err);
}

module.exports = { notFoundHandler };
