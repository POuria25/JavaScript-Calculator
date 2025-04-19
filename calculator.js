let currentInput = "";
let isOperatorClicked = false;


const operatorMapping = {};

function appendNumber(number) {
  if (isOperatorClicked) {
    isOperatorClicked = false;
  }
  if (number === "." && currentInput.slice(-1) === ".") return;
  currentInput += number.toString();
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === "") return;

  // Prevent factorial without number
  if (op === "!" && !/\d$/.test(currentInput)) {
    alert("Factorial can only be applied to a number.");
    return;
  }

  // Don't remove operators if adding a parenthesis or factorial
  const isSymbolOperator = ["+", "-", "*", "/", "%"];
  const isSpecial = ["(", ")"];
  
  const lastChar = currentInput.slice(-1);

  if (isOperatorClicked && isSymbolOperator.includes(op) && isSymbolOperator.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1);
  }

  currentInput += op;
  isOperatorClicked = isSymbolOperator.includes(op);
  updateDisplay();
}


function clearDisplay() {
  currentInput = "";
  isOperatorClicked = false;
  updateDisplay();
}

function factorial(n) {
  if (n < 0) throw new Error("Factorial is not defined for negative numbers.");
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function fib(n) {
  if (n < 0) throw new Error("Fibonacci is not defined for negative numbers.");
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}

function appendPower2() {
  if (currentInput === "") return;
  const match = currentInput.match(/(\d+(\.\d+)?)$/);
  if (match) {
    const number = match[1];
    currentInput = currentInput.slice(0, -number.length) + `${number}²`;
    updateDisplay();
  } else {
    alert("No valid number to square.");
  }
}

function appendSquareRoot() {
  if (currentInput === "") return;
  const match = currentInput.match(/(\d+(\.\d+)?)$/);
  if (match) {
    const number = match[1];
    currentInput = currentInput.slice(0, -number.length) + `√${number}`;
    updateDisplay();
  } else {
    alert("No valid number to apply square root.");
  }
}

function appendFib() {
  if (currentInput === "") return;
  const match = currentInput.match(/(\d+)$/);
  if (match) {
    const number = match[1];
    currentInput = currentInput.slice(0, -number.length) + `fib(${number})`;
    updateDisplay();
  } else {
    alert("No valid number to apply Fibonacci.");
  }
}

function appendMod() {
  if (currentInput === "") return;
  if (!/\d$/.test(currentInput)) {
    alert("Modulo must follow a number.");
    return;
  }
  currentInput += " % ";
  isOperatorClicked = true;
  updateDisplay();
}

function autoCloseParentheses(expression) {
  const openParens = (expression.match(/\(/g) || []).length;
  const closeParens = (expression.match(/\)/g) || []).length;
  let balancedExpression = expression;
  while (closeParens < openParens) {
    balancedExpression += ")";
    closeParens++;
  }
  return balancedExpression;
}

function preprocessExpression(expression) {
  // Replace 5! with factorial(5)
  expression = expression.replace(/(\d+)!/g, (_, num) => `factorial(${num})`);

  // Replace fib(5)
  expression = expression.replace(/fib\((\d+)\)/g, (_, num) => `fib(${num})`);

  // Replace √9 or √(9+1) with Math.sqrt(...)
  expression = expression.replace(/√(\d+|\([^()]*\))/g, (_, val) => `Math.sqrt(${val})`);

  // Replace 4² or (2+2)² with (val**2)
  expression = expression.replace(/(\d+|\([^()]*\))²/g, (_, val) => `(${val}**2)`);

  // Auto-close parentheses
  expression = autoCloseParentheses(expression);

  return expression;
}

function calculateResult() {
  try {
    const processed = preprocessExpression(currentInput);
    const result = eval(processed);
    currentInput = result.toString();
    updateDisplay();
  } catch (error) {
    alert("Invalid expression");
    clearDisplay();
  }
}

function updateDisplay() {
  document.getElementById("display").value = currentInput || "0";
}

function handleKeyPress(event) {
  const key = event.key;
  if (key >= '0' && key <= '9') {
    appendNumber(key);
  } else if (["+", "-", "*", "/"].includes(key)) {
    appendOperator(key);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Escape') {
    clearDisplay();
  } else if (key === '.') {
    appendNumber(key);
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  }
}

function handleButtonClick(buttonValue) {
  if (buttonValue >= '0' && buttonValue <= '9') {
    appendNumber(buttonValue);
  } else if (["+", "-", "*", "/"].includes(buttonValue)) {
    appendOperator(buttonValue);
  } else if (buttonValue === '=') {
    calculateResult();
  } else if (buttonValue === 'C') {
    clearDisplay();
  } else if (buttonValue === '.') {
    appendNumber(buttonValue);
  } else if (buttonValue === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (buttonValue === 'x²') {
    appendPower2();
  } else if (buttonValue === '√') {
    appendSquareRoot();
  } else if (buttonValue === 'fib') {
    appendFib();
  } else if (buttonValue === '%') {
    appendMod();
  } else if (buttonValue === '!') {
    appendOperator("!");
  }
}


document.addEventListener("keydown", handleKeyPress);
document.querySelectorAll(".button").forEach(button => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent || button.value;
    handleButtonClick(buttonValue);
  });
});
document.getElementById("display").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    calculateResult();
  } else if (event.key === "Escape") {
    event.preventDefault();
    clearDisplay();
  }
});
