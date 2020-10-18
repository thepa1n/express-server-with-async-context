const { name } = require(__dirname + '/../../package.json');

const config = {
  APPLICATION_NAME: name,
  ENV: 'development',
  IS_PRODUCTION: false,
  PORT: 4444,
}

module.exports = config;
