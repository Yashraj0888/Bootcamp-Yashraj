// index.js
const config = require('config');  // Use config library

// Accessing values from the config
try {
  const appName = config.get('app.name');
  const appVersion = config.get('app.version');
  const dbHost = config.get('database.host');
  const dbPort = config.get('database.port');

  console.log('App Name:', appName);
  console.log('App Version:', appVersion);
  console.log('Database Host:', dbHost);
  console.log('Database Port:', dbPort);
} catch (error) {
  console.error('Error accessing configuration:', error.message);
}
