const { ContextService } = require('./context.service');
const { APP_CONTEXT } = require('./structures');

class AppContextService extends ContextService {
  constructor() {
    super();
  }

  /**
   * Геттер для проверки есть ли данный контекст
   *
   * @returns {boolean} if exist returns => true
   */
  get isExist() {
    return super.checkExistContext();
  }

  /**
   * Метод для получения структуры контекста
   */
  getStructure() {
    return APP_CONTEXT;
  }

  /**
   * Статический Геттер для получения структуры контекста
   */
  static get structure() {
    return APP_CONTEXT;
  }

  /**
   * Геттеры для параметров контекста
   */
  get traceID() {
    return super.getContextVariable(APP_CONTEXT.PARAMS.TRACE_ID);
  }

  get userID() {
    return super.getContextVariable(APP_CONTEXT.PARAMS.USER_ID);
  }

  get reqStartTime() {
    return super.getContextVariable(APP_CONTEXT.PARAMS.REQ_START_TIME);
  }
}

module.exports = { AppContextService };
