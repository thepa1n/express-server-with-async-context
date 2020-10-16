const {
  contexts: { AppContextService }
} = require('../services');
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
  const timeStartRequest = Date.now();

  const APP_CONTEXT = new AppContextService();
  const CONTEXT_STRUCTURE = APP_CONTEXT.getStructure();

  // логаем сразу входящий запрос
  httpLogger.log(req);

  APP_CONTEXT.setContextVariable(CONTEXT_STRUCTURE.PARAMS.REQ_START_TIME, timeStartRequest);

  // логирование ответа от сервера
  const originalSend = res.send;
  res.send = function sendOverWrite(body) {
    originalSend.call(this, body);
    this.body = body;

    const timeEndRequest = Date.now();
    const duration = calculateTimeDuration(APP_CONTEXT.reqStartTime, timeEndRequest);
    
    /**
     * Получаем первую цифру статуса, тем самым получаем класс статуса
     * Если ошибка 1,2,3 класса и 404 то логаем, все остальные логаются в ерорке
     */
    const statusCodeClassError = `${res.statusCode}`[0];
    if (statusCodeClassError <= 3 || res.statusCode === 404) {
      httpLogger.log(req, res, duration);
    }
  };
  next();
}

/**
 * Custom Error logger. Intercept body in order to provide full logs.
 */
function customErrorLoggerMiddleware(err, req, res, next) {
  const APP_CONTEXT = new AppContextService();

  const originalSend = res.send;
  res.send = function sendOverWrite(body) {
    originalSend.call(this, body);
    this.body = body;

    const timeEndRequest = Date.now();
    const duration = calculateTimeDuration(APP_CONTEXT.reqStartTime, timeEndRequest);
    
    httpLogger.error(req, res, err, duration);
  };
  next(err);
}

module.exports = {
  customLoggerMiddleware,
  customErrorLoggerMiddleware
};
