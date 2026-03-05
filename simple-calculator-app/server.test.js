const request = require('supertest');
const express = require('express');
const path = require('path');
const { calculate } = require('./functions/calculator');

// Create a test app instance (same setup as server.js)
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/calc', (req, res) => {
  const { op, a, b } = req.body;
  try {
    const result = calculate(op, Number(a), Number(b));
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

describe('API Integration Tests - /api/calc endpoint', () => {
  
  describe('Successful calculations', () => {
    test('should perform addition and return result', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'add', a: 5, b: 3 });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('result');
      expect(res.body.result).toBe(8);
    });

    test('should perform subtraction and return result', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'sub', a: 10, b: 4 });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(6);
    });

    test('should perform multiplication and return result', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'mul', a: 6, b: 7 });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(42);
    });

    test('should perform division and return result', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'div', a: 20, b: 4 });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(5);
    });

    test('should handle string operands and convert to numbers', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'add', a: '10', b: '5' });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(15);
    });

    test('should handle decimal calculations', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'mul', a: 2.5, b: 4 });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(10);
    });

    test('should handle negative numbers', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'add', a: -5, b: 3 });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(-2);
    });
  });

  describe('Error handling - Invalid operations', () => {
    test('should return 400 for invalid operation', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'pow', a: 2, b: 3 });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('Invalid operation');
    });

    test('should return 400 for unsupported operation', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'sqrt', a: 16, b: 0 });
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid operation');
    });

    test('should return 400 for null operation', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: null, a: 5, b: 3 });
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid operation');
    });
  });

  describe('Error handling - Invalid operands', () => {
    test('should return 400 when first operand is non-numeric string', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'add', a: 'abc', b: 5 });
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Operands must be numbers');
    });

    test('should return 400 when second operand is non-numeric string', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'add', a: 5, b: 'xyz' });
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Operands must be numbers');
    });

    test('should handle null operand (converts to 0)', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'add', a: null, b: 5 });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(5);
    });

    test('should return 400 when operand is undefined', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'add', a: undefined, b: 5 });
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Operands must be numbers');
    });
  });

  describe('Error handling - Division by zero', () => {
    test('should return 400 when dividing by zero', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'div', a: 10, b: 0 });
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Division by zero');
    });

    test('should return 400 when dividing zero by zero', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'div', a: 0, b: 0 });
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Division by zero');
    });
  });

  describe('Request validation', () => {
    test('should handle POST request with correct content-type', async () => {
      const res = await request(app)
        .post('/api/calc')
        .set('Content-Type', 'application/json')
        .send({ op: 'add', a: 5, b: 3 });
      
      expect(res.status).toBe(200);
    });

    test('should return valid JSON response', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'mul', a: 3, b: 4 });
      
      expect(res.type).toMatch(/json/);
      expect(typeof res.body.result).toBe('number');
    });

    test('should handle missing operation field gracefully', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ a: 5, b: 3 });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    test('should handle missing operand fields gracefully', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'add' });
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Response format', () => {
    test('should include only result field in success response', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'add', a: 1, b: 2 });
      
      expect(Object.keys(res.body)).toEqual(['result']);
    });

    test('should include only error field in error response', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'invalid', a: 1, b: 2 });
      
      expect(Object.keys(res.body)).toEqual(['error']);
    });

    test('should return numeric result, not string', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'div', a: 10, b: 2 });
      
      expect(typeof res.body.result).toBe('number');
      expect(res.body.result).toBe(5);
    });
  });

  describe('Edge cases', () => {
    test('should handle very large numbers', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'add', a: 1000000, b: 2000000 });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(3000000);
    });

    test('should handle operations resulting in zero', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'sub', a: 5, b: 5 });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(0);
    });

    test('should handle negative zero result', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'sub', a: -5, b: 5 });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(-10);
    });

    test('should handle zero operands correctly', async () => {
      const res = await request(app)
        .post('/api/calc')
        .send({ op: 'mul', a: 0, b: 1000 });
      
      expect(res.status).toBe(200);
      expect(res.body.result).toBe(0);
    });
  });
});
