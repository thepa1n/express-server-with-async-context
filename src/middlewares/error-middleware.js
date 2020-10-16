const { IS_PRODUCTION } = require('../config');

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
    .json(IS_PRODUCTION ? productionResponse : developmentResponse);
}

module.exports = { errorMiddleware };
