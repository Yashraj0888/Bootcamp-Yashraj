// Load the appropriate configuration based on the environment
const loadConfig = require('./config/loader');
const config = loadConfig();

// Display the loaded configuration
console.log('Loaded Configuration:');
console.log(config);

// Example of using the configuration
console.log(`App Name: ${config.appName}`);
console.log(`API URL: ${config.apiUrl}`);
console.log(`Debug Mode: ${config.debug ? 'Enabled' : 'Disabled'}`);
