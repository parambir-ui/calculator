function calculate(op, a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
    throw new Error('Operands must be numbers');
  }
  switch (op) {
    case 'add':
      return a + b;
    case 'sub':
      return a - b;
    case 'mul':
      return a * b;
    case 'div':
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    default:
      throw new Error('Invalid operation');
  }
}

module.exports = { calculate };
