const { calculate } = require('../functions/calculator');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { op, a, b } = req.body;

  if (!op || a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Missing required parameters: op, a, b' });
  }

  try {
    const result = calculate(op, Number(a), Number(b));
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};