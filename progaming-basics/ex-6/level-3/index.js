const fs = require('fs');
const path = require('path');

// Read the configuration from the config.json file
function loadConfig() {
  const configPath = path.join(__dirname, 'config.json');
  const configData = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(configData);
}

// Set up logging based on the configuration
function setupLogging(level) {
  switch (level.toLowerCase()) {
    case 'debug':
      console.log('Logging Level: DEBUG');
      break;
    case 'info':
      console.log('Logging Level: INFO');
      break;
    case 'warn':
      console.log('Logging Level: WARN');
      break;
    case 'error':
      console.log('Logging Level: ERROR');
      break;
    default:
      console.log('Logging Level: INFO');
  }
}

// Dynamically load functions from a specified file
function loadFunctions(filePath, functionName) {
  try {
    const functions = require(filePath);
    if (functions[functionName]) {
      return functions[functionName];
    } else {
      console.error(`Function ${functionName} not found in ${filePath}`);
      return null;
    }
  } catch (err) {
    console.error(`Error loading functions from ${filePath}: ${err.message}`);
    return null;
  }
}

// Main function to run the program
function main() {
  const config = loadConfig();

  // Set up logging based on the config
  setupLogging(config.logging_level);

  // Dynamically load and use the functions specified in the config
  config.additional_functions.forEach((funcConfig) => {
    const { function_name, file } = funcConfig;
    const func = loadFunctions(file, function_name);

    if (func) {
      console.log(`Loaded function: ${function_name}`);
      // Example usage of the dynamically loaded function
      const result = func(0.5); // Call the function with an argument
      console.log(`Result of ${function_name}(0.5): ${result}`);
    }
  });
}

main();
