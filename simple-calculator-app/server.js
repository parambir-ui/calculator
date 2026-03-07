// Express server used during local development. In production (Vercel)
// each API route becomes its own serverless function, and the frontend is
// served directly from the `public/` directory.
const express = require('express');
const path = require('path');
const { calculate } = require('./functions/calculator');

const app = express();
// parse JSON bodies for POST requests
app.use(express.json());
// serve static frontend files from public/
app.use(express.static(path.join(__dirname, 'public')));

// POST /api/calc - accepts {op,a,b} and returns {result}
// Used by client-side fetch calls and by integration tests.
app.post('/api/calc', (req, res) => {
  const { op, a, b } = req.body;
  try {
    const result = calculate(op, Number(a), Number(b));
    res.json({ result });
  } catch (err) {
    // send back useful error messages with HTTP 400
    res.status(400).json({ error: err.message });
  }
});

// any other route should return index.html so that the SPA can handle
// navigation (and also to keep things simple during local development)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export for Vercel
module.exports = app;

// Only start server if not in Vercel environment
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
