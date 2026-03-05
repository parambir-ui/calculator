let display = document.getElementById('result');
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldClearDisplay = false;
let currentExpression = '0'; // Track the full expression being built

const numberButtons = document.querySelectorAll('[data-num]');
const operatorButtons = document.querySelectorAll('[data-op]');
const decimalBtn = document.querySelector('[data-decimal]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const signBtn = document.querySelector('[data-sign]');
const percentBtn = document.querySelector('[data-percent]');
const themeToggle = document.getElementById('theme-toggle');

// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const isLightMode = body.classList.contains('light-mode');

  if (isLightMode) {
    body.classList.remove('light-mode');
    themeToggle.textContent = '☀️';
    localStorage.setItem('calculator-theme', 'dark');
  } else {
    body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
    localStorage.setItem('calculator-theme', 'light');
  }
}

// Load saved theme on page load
function loadSavedTheme() {
  const savedTheme = localStorage.getItem('calculator-theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '🌙';
  } else {
    themeToggle.textContent = '☀️';
  }
}

function getOperatorSymbol(op) {
  const symbols = {
    'add': '+',
    'sub': '−',
    'mul': '×',
    'div': '÷'
  };
  return symbols[op] || op;
}

function updateDisplay() {
  // Show the current expression, or just the current value if no expression
  const text = currentExpression || currentValue;
  display.textContent = text;
}

function handleNumber(num) {
  if (shouldClearDisplay || currentValue === '0') {
    currentValue = num;
    currentExpression = num;
    shouldClearDisplay = false;
  } else {
    currentValue += num;
    currentExpression += num;
  }
  updateDisplay();
}

function handleDecimal() {
  if (shouldClearDisplay) {
    currentValue = '0.';
    currentExpression = '0.';
    shouldClearDisplay = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
    currentExpression += '.';
  }
  updateDisplay();
}

function handleOperator(op) {
  const inputValue = parseFloat(currentValue);

  if (previousValue === '') {
    previousValue = inputValue;
  } else if (operation) {
    const result = performCalculation(parseFloat(previousValue), inputValue, operation);
    currentValue = isNaN(result) ? '0' : result.toString();
    previousValue = result;
  }

  operation = op;
  shouldClearDisplay = true;

  // Update expression with operator
  const opSymbol = getOperatorSymbol(op);
  currentExpression = currentValue + ' ' + opSymbol;
}

function handleEquals() {
  const inputValue = parseFloat(currentValue);

  if (operation && previousValue !== '') {
    try {
      const result = performCalculation(parseFloat(previousValue), inputValue, operation);
      const resultStr = isNaN(result) ? '0' : result.toString();

      // Show the complete expression with result permanently
      const opSymbol = getOperatorSymbol(operation);
      currentExpression = previousValue + ' ' + opSymbol + ' ' + inputValue + ' = ' + resultStr;

      currentValue = resultStr;
      previousValue = '';
      operation = null;
      shouldClearDisplay = true;

      updateDisplay();

    } catch (err) {
      currentValue = 'Error';
      currentExpression = 'Error';
      operation = null;
      shouldClearDisplay = true;
      display.classList.remove('expression', 'long');
      updateDisplay();
    }
  }
}

function handleClear() {
  currentValue = '0';
  previousValue = '';
  operation = null;
  shouldClearDisplay = false;
  currentExpression = '0';
  display.classList.remove('expression', 'long');
  updateDisplay();
}

function handleSign() {
  const value = parseFloat(currentValue);
  const newValue = (value * -1).toString();
  currentValue = newValue;

  // Update expression - replace the last number with its negated version
  if (currentExpression.includes(' ')) {
    // If there's an operator, update the part after the operator
    const parts = currentExpression.split(' ');
    parts[parts.length - 1] = newValue;
    currentExpression = parts.join(' ');
  } else {
    // If no operator, just update the whole expression
    currentExpression = newValue;
  }

  updateDisplay();
}

function handlePercent() {
  const value = parseFloat(currentValue);
  const newValue = (value / 100).toString();
  currentValue = newValue;

  // Update expression - replace the last number with its percentage
  if (currentExpression.includes(' ')) {
    // If there's an operator, update the part after the operator
    const parts = currentExpression.split(' ');
    parts[parts.length - 1] = newValue;
    currentExpression = parts.join(' ');
  } else {
    // If no operator, just update the whole expression
    currentExpression = newValue;
  }

  updateDisplay();
}

function roundToThreeDecimals(num) {
  const rounded = Math.round(num * 1000) / 1000;
  // If the rounded number is a whole number, return it as an integer
  return rounded % 1 === 0 ? rounded : rounded;
}

function performCalculation(a, b, op) {
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
      result = b;
  }
  return roundToThreeDecimals(result);
}

// Event listeners
numberButtons.forEach(btn => {
  btn.addEventListener('click', () => handleNumber(btn.dataset.num));
});

operatorButtons.forEach(btn => {
  btn.addEventListener('click', () => handleOperator(btn.dataset.op));
});

decimalBtn.addEventListener('click', handleDecimal);
equalsBtn.addEventListener('click', handleEquals);
clearBtn.addEventListener('click', handleClear);
signBtn.addEventListener('click', handleSign);
percentBtn.addEventListener('click', handlePercent);
themeToggle.addEventListener('click', toggleTheme);

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
  if (e.key === '.') handleDecimal();
  if (e.key === '+') { e.preventDefault(); handleOperator('add'); }
  if (e.key === '-') { e.preventDefault(); handleOperator('sub'); }
  if (e.key === '*') { e.preventDefault(); handleOperator('mul'); }
  if (e.key === '/') { e.preventDefault(); handleOperator('div'); }
  if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); handleEquals(); }
  if (e.key === 'Escape') handleClear();
});

// Initialize
loadSavedTheme();
updateDisplay();
