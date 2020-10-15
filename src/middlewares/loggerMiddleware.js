const {
  contexts: { AppContextService }
} = require('../services');
const { CONTEXT_NAMES } = require('../const');
const { httpLogger } = require('../utils/loggerService');

/**
 * Сalculating request duration
 * @param {integer} startTime start dateTime in milliseconds
 * @param {integer} endTime  end dateTime in milliseconds
 */
const calculateTimeDuration = (startTime, endTime) => endTime - startTime;

/**
 * Custom logger. Intercept body in order to provide full logs.
 */
function customLoggerMiddleware(req, res, next) {
  const APP_CONTEXT = new AppContextService();
  const { end } = res;

  const timeStartRequest = Date.now();

  APP_CONTEXT.setContextVariable(CONTEXT_NAMES.APP_CONTEXT.PARAMS.REQ_START_TIME, timeStartRequest);

  httpLogger.log(req);

  res.end = (chunk, encoding) => {
    res.end = end;
    res.end(chunk, encoding);
    if (chunk) {
      const timeEndRequest = Date.now();
      const duration = calculateTimeDuration(timeStartRequest, timeEndRequest);

      res.body = chunk.toString();

      /**
       * Получаем первую цифру статуса, тем самым получаем класс ошибки
       * Если ошибка 1,2,3 класса и 404 то логаем, все остальные логаются в ерорке
       */
      const statusCodeClassError = `${res.statusCode}`[0];
      if (statusCodeClassError <= 3 || res.statusCode === 404) {
        httpLogger.log(req, res, duration);
      }
    }
  };
  next();
}

/**
 * Custom Error logger. Intercept body in order to provide full logs.
 */
function customErrorLoggerMiddleware(err, req, res, next) {
  const APP_CONTEXT = new AppContextService();
  const { end } = res;

  res.end = (chunk, encoding) => {
    res.end = end;
    res.end(chunk, encoding);
    if (chunk) {
      const duration = calculateTimeDuration(APP_CONTEXT.reqStartTime, Date.now());
      res.body = chunk.toString();

      httpLogger.error(req, res, err, duration);
    }
  };
  next(err);
}

module.exports = {
  customLoggerMiddleware,
  customErrorLoggerMiddleware
};
