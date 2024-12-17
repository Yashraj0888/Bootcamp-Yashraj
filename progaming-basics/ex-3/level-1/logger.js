// logger.js
const winston = require('winston');

// Create a logger instance with different log levels and colorized output
const logger = winston.createLogger({
  level: 'info', // Set the default logging level to info
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),   // Color the output in the console
        winston.format.simple()      // Use a simple format
      ),
    }),
  ],
});

// Export the logger to use in other files
module.exports = logger;
