const { v4: uuidv4 } = require('uuid');

const {
  contexts: { AppContextService }
} = require('../services');
const config = require('../config');

/**
 * Функция для извлечения параметра из Хедера
 * Если параметра нет то генерим ключ или возращаем null
 * @param {Request} req объект запроса
 * @param {string} paramName название параметра в Headers
 * @param {boolean} generateIfNotExist если нет в запросе, создавать ли свой
 */
const getParamFromReqHeader = (headers, paramName, generateIfNotExist = false) => {
  const parameterFromHeader = headers[paramName];

  if (!generateIfNotExist) {
    return parameterFromHeader || null;
  }

  return parameterFromHeader || `${config.APPLICATION_NAME}-${uuidv4()}`;
};

const initAsyncContextMiddleware = (req, res, next) => {
  const createdContext = AppContextService.createContext();

  // req и res - это event emitters. Мы хотим иметь доступ к CLS контексту внутри их коллбеков
  createdContext.bind(req);
  createdContext.bind(res);

  createdContext.run(() => {
    const APP_CONTEXT = new AppContextService();
    const CONTEXT_STRUCTURE = APP_CONTEXT.getStructure();

    const userID = getParamFromReqHeader(req.headers, CONTEXT_STRUCTURE.HEADERS.USER_ID);
    const traceID = getParamFromReqHeader(
      req.headers,
      CONTEXT_STRUCTURE.HEADERS.TRACE_ID,
      true
    );

    APP_CONTEXT.setContextVariable(CONTEXT_STRUCTURE.PARAMS.TRACE_ID, traceID);
    APP_CONTEXT.setContextVariable(CONTEXT_STRUCTURE.PARAMS.USER_ID, userID);

    next();
  });
};

module.exports = { initAsyncContextMiddleware };
