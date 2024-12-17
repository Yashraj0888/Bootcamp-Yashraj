#!/usr/bin/env node

const { add, multiply } = require('./mathutils');

// Get the command line arguments
const args = process.argv.slice(2);
console.log('Arguments:', args); // Debugging line to check the arguments

const command = args[0];
const num1 = parseFloat(args[1]);
const num2 = parseFloat(args[2]);

if (!command || isNaN(num1) || isNaN(num2)) {
  console.log('Invalid input. Please provide a valid command and two numbers.');
  process.exit(1); // Exit with an error code
}

if (command === 'add') {
    console.log(`Result: ${add(num1, num2)}`);
} else if (command === 'multiply') {
    console.log(`Result: ${multiply(num1, num2)}`);
} else {
    console.log('Invalid command. Use "add" or "multiply"');
}
