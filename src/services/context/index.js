const ContextService = require('./context.service');
const AppContextService = require('./app-context.service');

module.exports = {
  ...require('./context.service'),
  ...require('./app-context.service'),
};
