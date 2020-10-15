const { name } = require(process.env.PWD + '/package.json')

const config = {
  APPLICATION_NAME: name,
  ENV: 'development',
  IS_PRODUCTION: false,
}

module.exports = config;
