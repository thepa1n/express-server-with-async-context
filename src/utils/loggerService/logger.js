const winston = require('winston');
const stringify = require('fast-safe-stringify');

const {
  contexts: { AppContextService }
} = require('../../services');
const config = require('../../config');

class Logger {
  constructor() {
    this.initializeLogger();
  }

  initializeLogger() {
    this.logger = winston.createLogger({
      transports: [new winston.transports.Console()]
    });
  }

  /**
   *
   * @param {string} message -> text message
   * @param {object} params -> all parameters for log
   * @param {Request} req
   * @param {Response} res
   * @param {Error} err
   */
  formatting({ message, params = null, req, res, err, duration }) {
    const APP_CONTEXT = new AppContextService();

    this.formattedLog = {
      _application: config.APPLICATION_NAME,
      _stage: config.ENV,
      timestamp: new Date().toISOString(),
      message
    };

    if (APP_CONTEXT.isExist) {
      this.formattedLog = {
        ...this.formattedLog,
        traceID: APP_CONTEXT.traceID,
        userID: APP_CONTEXT.userID
      };
    }

    if (params) {
      this.formattedLog.message += stringify(params);
    }

    if (duration) {
      this.formattedLog.duration = `+${duration} ms`;
    }

    if (req) {
      this.formattedLog.inUrl = req.originalUrl;
      this.formattedLog.request = stringify({
        method: req.method,
        query: req.query,
        params: req.params,
        body: req.body
      });
    }

    if (res) {
      this.formattedLog.statusCode = res.statusCode;
      this.formattedLog.outUrl = res.locals.outUrl;

      if (res.body) {
        if (typeof res.body === 'string') {
          this.formattedLog.response = res.body;
        } else {
          this.formattedLog.response = stringify(res.body);
        }
      }
    }

    

    if (err) {
      this.formattedLog = {
        ...this.formattedLog,
        errorCode: err.code,
        message: err.message,
        stack: err.stack
      };
    }

    return this.formattedLog;
  }

  log(message, params) {
    this.logger.log(
      'info',
      this.formatting({
        message,
        params
      })
    );
  }

  error(message, trace) {
    this.logger.log(
      'error',
      this.formatting({
        message,
        err: trace
      })
    );
  }

  warn(message, params) {
    this.logger.warn(
      this.formatting({
        message,
        params
      })
    );
  }

  info(message, params) {
    this.logger.info(
      this.formatting({
        message,
        params,
      })
    );
  }

  debug(message, params) {
    this.logger.debug(
      this.formatting({
        message,
        params
      })
    );
  }

  verbose(message, params) {
    this.logger.verbose(
      this.formatting({
        message,
        params
      })
    );
  }
}

module.exports = {
  logger: new Logger(),
  Logger,
};
