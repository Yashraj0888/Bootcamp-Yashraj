// index.js
const config = require('./config');

console.log('App Configuration:');
console.log(`Database URL: ${config.DATABASE_URL}`);
console.log(`API Key: ${config.API_KEY}`);
console.log(`App is running on port: ${config.PORT}`);
