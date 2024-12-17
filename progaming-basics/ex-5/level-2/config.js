// config.js
require('dotenv').config(); // Load environment variables from .env file

const getEnvVariable = (key, fallbackValue) => {
  const value = process.env[key];

  if (!value) {
    console.warn(`Warning: Missing environment variable '${key}'. Using fallback value: '${fallbackValue}'.`);
    return fallbackValue;
  }

  return value;
};

// Export environment variables with fallbacks
module.exports = {
  DATABASE_URL: getEnvVariable('DATABASE_URL', 'default-database-url'),
  API_KEY: getEnvVariable('API_KEY', 'default-api-key'),
  PORT: getEnvVariable('PORT', 3000), // Fallback to 3000 if PORT is missing
};
