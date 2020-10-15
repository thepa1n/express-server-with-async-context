const Logger = require('./logger');
const HttpLogger = require('./http-logger');

module.exports = {
  logger: new Logger(),
  httpLogger: new HttpLogger()
};
