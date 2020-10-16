const { createNamespace, getNamespace } = require('cls-hooked');

class ContextService {
  constructor(contextName) {
    this.context = getNamespace(contextName);
  }

  /**
   * Создание нового контекста
   * @param {string} contextName название контекста
   */
  static createContext(contextName) {
    return createNamespace(contextName);
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
  checkExistContext(contextName) {
    const allContexts = this.getAllContexts();
    if (!allContexts) {
      return false;
    }
    return !!allContexts[contextName];
  }
}

module.exports = { ContextService };
