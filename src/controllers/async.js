const { logger } = require('../utils/loggerService');

module.exports = async (req, res) => {
  logger.info('Test Async route!');

  setTimeout(() => {
    logger.info('Timeout Completed!');

    res.json({
      text: 'Hello World!',
      id: 'sss',
    })
  }, 2000)
};
