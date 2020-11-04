const Logger = require('./logger');

class HttpLogger extends Logger {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  log(req, res, duration) {
    this.logger.log(
      'info',
      this.formatting({
        req,
        res,
        duration
      })
    );
  }

  error(req, res, err, duration) {
    this.logger.error(
      this.formatting({
        req,
        res,
        err,
        duration
      })
    );
  }
}

module.exports = HttpLogger;
