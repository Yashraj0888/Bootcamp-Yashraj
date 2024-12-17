
const logger = require('./logger');

// Function to divide two numbers with logging
function divide(a, b) {
  if (b === 0) {
    logger.error('Fatal error: Division by zero'); // Log an error if division by zero
    return 'Error: Division by zero';
  } else {
    const result = a / b;
    logger.info(`Division successful: ${a} / ${b} = ${result}`); // Log a success message
    return result;
  }
}

// Function to start the program and log events
function startProgram() {
  logger.info('Program started'); // Log when the program starts

  // Simulate an operation
  logger.info('Operation successful');

  // Call divide function
  const result1 = divide(10, 2);  // This should be successful
  console.log(result1);
  
  const result2 = divide(10, 0);  // This should log a fatal error
  console.log(result2);
}

// Start the program
startProgram();
