// app.js
const debug = require('debug')('app:app');  // Initialize debug for this module

debug('This is a debug message from app.js');

// Simulating some logic to show debug in action
function processRequest() {
  debug('Processing request...');
  setTimeout(() => {
    debug('Request processed!');
  }, 1000);
}

processRequest();

