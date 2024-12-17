// log_system/logger.js

const logger = require('./config');

// Function to log messages at different levels
function logMessage(message, level = 'info') {
    switch (level) {
        case 'debug':
            logger.debug(message);
            break;
        case 'warn':
            logger.warn(message);
            break;
        case 'error':
            logger.error(message);
            break;
        case 'info':
        default:
            logger.info(message);
            break;
    }
}

module.exports = { logMessage };
