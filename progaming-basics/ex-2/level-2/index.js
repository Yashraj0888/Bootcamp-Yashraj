const process = require('process');

// Function to add numbers
function addNumbers(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

// Function to multiply numbers
function multiplyNumbers(numbers) {
  return numbers.reduce((product, num) => product * num, 1);
}

// Parse arguments
const args = process.argv.slice(2);  // Remove the first two default arguments (node and script path)

// Function to print usage instructions
function printUsage() {
  console.log('Usage:');
  console.log('  --add [num1, num2, ...]  Add the numbers');
  console.log('  --multiply [num1, num2, ...]  Multiply the numbers');
  console.log('Example:');
  console.log('  node index.js --add 1 2 3');
  console.log('  node index.js --multiply 2 3 4');
}

// Check for flags and handle accordingly
if (args.includes('--add')) {
  const numbers = args.slice(args.indexOf('--add') + 1).map(Number);
  if (numbers.length > 0) {
    const sum = addNumbers(numbers);
    console.log(`Sum: ${sum}`);
  } else {
    console.log('Error: Please provide numbers to add.');
    printUsage();
  }
} else if (args.includes('--multiply')) {
  const numbers = args.slice(args.indexOf('--multiply') + 1).map(Number);
  if (numbers.length > 0) {
    const product = multiplyNumbers(numbers);
    console.log(`Product: ${product}`);
  } else {
    console.log('Error: Please provide numbers to multiply.');
    printUsage();
  }
} else {
  console.log('Error: No operation flag specified.');
  printUsage();
}
