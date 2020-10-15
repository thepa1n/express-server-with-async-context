const { logger } = require('../utils/loggerService');
const { isProduction } = require('../config');
// const { ERROR_MESSAGES, ERROR_STATUS, ERROR_CODES } = require('../');

// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  const productionResponse = {
    code: err.code || 1000,
    status: err.status || 500,
    message: err.isCustom ? err.message : 'Something went wrong.'
  };

  const developmentResponse = {
    ...productionResponse,
    stack: err.stack,
    message: err.message
  };

  return res
    .status(productionResponse.status)
    .json(isProduction ? productionResponse : developmentResponse);
}

const handleErrorAsync = func => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = { errorMiddleware, handleErrorAsync };
