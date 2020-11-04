const httpContext = require('http-request-context');

class ContextService {
  constructor() {
    this.context = httpContext;
  }

  /**
   * Метод для добавления значения в контекст
   * @param {string} key название параметра в контексте
   * @param {*} value значение параметра
   */
  setContextVariable(key, value) {
    return this.context.set(key, value);
  }

  /**
   * Метод для получения параметра из контекста
   * @param {string} variableName название параметра
   */
  getContextVariable(variableName) {
    return this.context.get(variableName);
  }

  /**
   * Получить объект контекста
   */
  static getHttpContext() {
    return httpContext;
  }

  /**
   * Cls-Hooked записывает все контексты в процесс
   */
  // eslint-disable-next-line class-methods-use-this
  getAllContexts() {
    return process.namespaces;
  }

  /**
   * Проверяем есть ли такой контекст true если есть
   * @param {string} contextName
   */
  checkExistContext() {
    const allVariables = this.context.get();
    if (typeof allVariables === 'object') {
      return !!Object.keys(allVariables).length;
    }
    return false;
  }
}

module.exports = { ContextService };
