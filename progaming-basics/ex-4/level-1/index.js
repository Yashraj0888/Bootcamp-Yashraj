// index.js
const debug = require('debug')('app:index');  // Initialize debug for this module

debug('This is a debug message from index.js');
require('./app');  // Require the app.js file to trigger its functionality
