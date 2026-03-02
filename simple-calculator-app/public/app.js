document.getElementById('calc').addEventListener('click', async () => {
  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const op = document.getElementById('op').value;
  const resultEl = document.getElementById('result');

  try {
    const resp = await fetch('/api/calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ op, a, b })
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Request failed');
    resultEl.textContent = `Result: ${data.result}`;
  } catch (err) {
    resultEl.textContent = `Error: ${err.message}`;
  }
});
