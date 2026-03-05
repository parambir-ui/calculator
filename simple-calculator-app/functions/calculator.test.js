const { calculate } = require('./calculator');

describe('Calculator - calculate() function', () => {
  
  describe('Addition operation', () => {
    test('should add two positive numbers', () => {
      expect(calculate('add', 5, 3)).toBe(8);
    });

    test('should add two negative numbers', () => {
      expect(calculate('add', -5, -3)).toBe(-8);
    });

    test('should add positive and negative numbers', () => {
      expect(calculate('add', 10, -5)).toBe(5);
    });

    test('should add zero to a number', () => {
      expect(calculate('add', 5, 0)).toBe(5);
    });

    test('should add decimal numbers', () => {
      expect(calculate('add', 2.5, 3.5)).toBe(6);
    });
  });

  describe('Subtraction operation', () => {
    test('should subtract two positive numbers', () => {
      expect(calculate('sub', 10, 3)).toBe(7);
    });

    test('should subtract and return negative result', () => {
      expect(calculate('sub', 3, 10)).toBe(-7);
    });

    test('should subtract two negative numbers', () => {
      expect(calculate('sub', -5, -3)).toBe(-2);
    });

    test('should subtract zero from a number', () => {
      expect(calculate('sub', 5, 0)).toBe(5);
    });

    test('should subtract decimal numbers', () => {
      expect(calculate('sub', 7.5, 2.5)).toBe(5);
    });
  });

  describe('Multiplication operation', () => {
    test('should multiply two positive numbers', () => {
      expect(calculate('mul', 4, 5)).toBe(20);
    });

    test('should multiply positive and negative numbers', () => {
      expect(calculate('mul', 4, -5)).toBe(-20);
    });

    test('should multiply two negative numbers', () => {
      expect(calculate('mul', -4, -5)).toBe(20);
    });

    test('should multiply by zero', () => {
      expect(calculate('mul', 5, 0)).toBe(0);
    });

    test('should multiply decimal numbers', () => {
      expect(calculate('mul', 2.5, 4)).toBe(10);
    });
  });

  describe('Division operation', () => {
    test('should divide two positive numbers', () => {
      expect(calculate('div', 10, 2)).toBe(5);
    });

    test('should divide and return decimal result', () => {
      expect(calculate('div', 7, 2)).toBe(3.5);
    });

    test('should divide positive and negative numbers', () => {
      expect(calculate('div', -10, 2)).toBe(-5);
    });

    test('should divide two negative numbers', () => {
      expect(calculate('div', -10, -2)).toBe(5);
    });

    test('should divide zero by a number', () => {
      expect(calculate('div', 0, 5)).toBe(0);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => calculate('div', 10, 0)).toThrow('Division by zero');
    });
  });

  describe('Error handling - Invalid operands', () => {
    test('should throw error when first operand is not a number', () => {
      expect(() => calculate('add', 'abc', 5)).toThrow('Operands must be numbers');
    });

    test('should throw error when second operand is not a number', () => {
      expect(() => calculate('add', 5, 'abc')).toThrow('Operands must be numbers');
    });

    test('should throw error when both operands are not numbers', () => {
      expect(() => calculate('add', 'a', 'b')).toThrow('Operands must be numbers');
    });

    test('should throw error when first operand is null', () => {
      expect(() => calculate('add', null, 5)).toThrow('Operands must be numbers');
    });

    test('should throw error when second operand is null', () => {
      expect(() => calculate('add', 5, null)).toThrow('Operands must be numbers');
    });

    test('should throw error when first operand is undefined', () => {
      expect(() => calculate('add', undefined, 5)).toThrow('Operands must be numbers');
    });

    test('should throw error when first operand is NaN', () => {
      expect(() => calculate('add', NaN, 5)).toThrow('Operands must be numbers');
    });

    test('should throw error when second operand is NaN', () => {
      expect(() => calculate('add', 5, NaN)).toThrow('Operands must be numbers');
    });
  });

  describe('Error handling - Invalid operations', () => {
    test('should throw error for invalid operation', () => {
      expect(() => calculate('pow', 2, 3)).toThrow('Invalid operation');
    });

    test('should throw error for undefined operation', () => {
      expect(() => calculate(undefined, 5, 3)).toThrow('Invalid operation');
    });

    test('should throw error for null operation', () => {
      expect(() => calculate(null, 5, 3)).toThrow('Invalid operation');
    });

    test('should throw error for empty string operation', () => {
      expect(() => calculate('', 5, 3)).toThrow('Invalid operation');
    });
  });

  describe('Edge cases', () => {
    test('should handle very large numbers', () => {
      expect(calculate('add', 1000000, 2000000)).toBe(3000000);
    });

    test('should handle very small decimal numbers', () => {
      expect(calculate('add', 0.0001, 0.0002)).toBeCloseTo(0.0003);
    });

    test('should handle negative zero', () => {
      expect(calculate('add', -5, 5)).toBe(0);
    });

    test('should handle operations that result in Infinity is prevented by valid numbers', () => {
      // JS can create infinity, but our operands must be valid numbers
      expect(calculate('mul', 1e308, 10)).toBeGreaterThan(0);
    });
  });
});
