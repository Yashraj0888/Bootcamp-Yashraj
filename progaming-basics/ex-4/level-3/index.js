// index.js
const debug = require('debug')('app');
const readlineSync = require('readline-sync');
const logger = require('./logger');

// Debugging function for computation
const debugCompute = debug.extend('compute');
const debugInput = debug.extend('input');

// Interactive program to compute addition or subtraction
function compute() {
  logger.info('Starting the interactive computation program...');
  
  const operation = readlineSync.question('Enter operation (add/subtract): ').toLowerCase();
  debugInput(`User inputted operation: ${operation}`);
  
  const num1 = readlineSync.questionInt('Enter first number: ');
  debugInput(`User inputted first number: ${num1}`);
  
  const num2 = readlineSync.questionInt('Enter second number: ');
  debugInput(`User inputted second number: ${num2}`);
  
  let result;

  if (operation === 'add') {
    result = num1 + num2;
    logger.info(`Performing addition: ${num1} + ${num2} = ${result}`);
    debugCompute(`Addition operation: ${num1} + ${num2} = ${result}`);
  } else if (operation === 'subtract') {
    result = num1 - num2;
    logger.info(`Performing subtraction: ${num1} - ${num2} = ${result}`);
    debugCompute(`Subtraction operation: ${num1} - ${num2} = ${result}`);
  } else {
    logger.error(`Invalid operation: ${operation}`);
    debugCompute(`Invalid operation entered: ${operation}`);
    return;
  }

  logger.info(`Result: ${result}`);
  debugCompute(`Computation result: ${result}`);
}

// Start the program
compute();
