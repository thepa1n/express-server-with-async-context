const AppContextService = require('./app-context.service');

const getHeadersForTracingRequest = () => {
  const { CONTEXT_NAMES } = require('../../const');

  const APP_CONTEXT = new AppContextService();

  const { HEADERS } = CONTEXT_NAMES.APP_CONTEXT;

  return {
    [HEADERS.USER_ID]: APP_CONTEXT.userID,
    [HEADERS.TRACE_ID]: APP_CONTEXT.traceID,
  }
}

module.exports = { getHeadersForTracingRequest };
