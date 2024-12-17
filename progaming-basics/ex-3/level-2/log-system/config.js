// log_system/config.js

const winston = require('winston');

// Create a log format with timestamps
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} - ${level}: ${message}`;
});

// Configure logger
const logger = winston.createLogger({
    level: 'info',  // Set default log level to 'info'
    format: winston.format.combine(
        winston.format.timestamp(),  // Add timestamp to logs
        winston.format.simple(),     // Use simple format
        logFormat                   // Use the custom log format
    ),
    transports: [
        // File transport - log to 'app_logs.log'
        new winston.transports.File({ filename: 'app_logs.log' }),

        // Console transport (optional) - log to console as well
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // Colorize log level
                winston.format.simple()    // Use simple format for console
            )
        })
    ]
});

module.exports = logger;
