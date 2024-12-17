// config.js
require('dotenv').config();  // Load environment variables from .env file

module.exports = {
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST || 'localhost',
  dbUser: process.env.DB_USER || 'root',
  dbPass: process.env.DB_PASS || 'password',
};
