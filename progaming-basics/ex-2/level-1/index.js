// Get command-line arguments (excluding the first two: 'node' and script name)
const args = process.argv.slice(2);

// Function to calculate the sum of numbers
function calculateSum(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

try {
    // Convert arguments to numbers and validate input
    const numbers = args.map(arg => {
        const num = parseFloat(arg);
        if (isNaN(num)) {
            throw new Error(`Invalid input: '${arg}' is not a number.`);
        }
        return num;
    });

    // Calculate and display the sum
    const sum = calculateSum(numbers);
    console.log(`The sum of the numbers is: ${sum}`);
} catch (error) {
    console.error(error.message);
    console.log("Usage: node sumArguments.js <number1> <number2> ... <numberN>");
}
