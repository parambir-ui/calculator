function roundToThreeDecimals(num) {
  return Math.round(num * 1000) / 1000;
}

function calculate(op, a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Operands must be numbers');
  }

  let result;
  switch (op) {
    case 'add':
      result = a + b;
      break;
    case 'sub':
      result = a - b;
      break;
    case 'mul':
      result = a * b;
      break;
    case 'div':
      if (b === 0) throw new Error('Division by zero');
      result = a / b;
      break;
    default:
      throw new Error('Invalid operation');
  }

  return roundToThreeDecimals(result);
}

module.exports = { calculate };
