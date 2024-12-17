require('dotenv').config();  // Load environment variables from .env file

const debug = require('debug');  // Import the debug package

// Define debug namespaces
const module1Debug = debug('module1');
const module2Debug = debug('module2');

// Log the environment variables to ensure they're being loaded
console.log('DEBUG_MODULE1:', process.env.DEBUG_MODULE1);
console.log('DEBUG_MODULE2:', process.env.DEBUG_MODULE2);

// Enable debugging for module1 if the environment variable is true
if (process.env.DEBUG_MODULE1 === 'true') {
    module1Debug('Debugging Module 1...');
}

// Enable debugging for module2 if the environment variable is true
if (process.env.DEBUG_MODULE2 === 'true') {
    module2Debug('Debugging Module 2...');
}
