const devConfig = require('./config.dev');
const prodConfig = require('./config.prod');
const commonConfig = require('./config');

const env = process.env.NODE_ENV || 'development'; // default to 'development' if NODE_ENV is not set

function loadConfig() {
  switch (env) {
    case 'production':
      return { ...commonConfig, ...prodConfig };
    case 'development':
    default:
      return { ...commonConfig, ...devConfig };
  }
}

module.exports = loadConfig;
