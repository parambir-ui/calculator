// Helper: ensure numerical results are rounded to at most three decimal places.
// This keeps the display clean (prevents long floating-point tails) and
// mirrors the precision requirement of the UI.
function roundToThreeDecimals(num) {
  return Math.round(num * 1000) / 1000;
}

// Core calculation function used by both the API and the client
// `op` is a string identifier for the operation, `a` and `b` are numbers.
// Throws descriptive errors for invalid input so the caller can handle them.
function calculate(op, a, b) {
  // input validation - ensures consumers don't accidentally send strings
  if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Operands must be numbers');
  }

  let result;
  switch (op) {
    case 'add':
      // addition
      result = a + b;
      break;
    case 'sub':
      // subtraction
      result = a - b;
      break;
    case 'mul':
      // multiplication
      result = a * b;
      break;
    case 'div':
      // division - guard against divide-by-zero
      if (b === 0) throw new Error('Division by zero');
      result = a / b;
      break;
    default:
      // operation not supported
      throw new Error('Invalid operation');
  }

  // normalize precision
  return roundToThreeDecimals(result);
}

module.exports = { calculate };
