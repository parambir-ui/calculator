const express = require('express');
const path = require('path');
const { calculate } = require('./functions/calculator');

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

// Export for Vercel
module.exports = app;

// Only start server if not in Vercel environment
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
