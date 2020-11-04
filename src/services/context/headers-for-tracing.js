const { AppContextService } = require('./app-context.service');
// const { logger } = require('../../utils/logger');

const getHeadersForTracingRequest = () => {
  const APP_CONTEXT = new AppContextService();

  const { HEADERS } = APP_CONTEXT.getStructure();

  const result = {
    [HEADERS.USER_ID]: APP_CONTEXT.userID,
    [HEADERS.TRACE_ID]: APP_CONTEXT.traceID,
  }

  // logger.info('[getHeadersForTracingRequest] Result Headers: ', { result });
  console.log('[getHeadersForTracingRequest] Result Headers: ', { result });

  return result;
}

module.exports = { getHeadersForTracingRequest };
