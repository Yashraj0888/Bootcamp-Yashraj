// main.js

const { logMessage } = require('./log-system/logger');

// Test logging at different levels
logMessage('This is an info message');
logMessage('This is a debug message', 'debug');
logMessage('This is a warning message', 'warn');
logMessage('This is an error message', 'error');
