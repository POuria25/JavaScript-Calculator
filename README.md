# JavaScript Calculator

![image](https://github.com/user-attachments/assets/577ada3f-d5d9-46ae-9f3f-1ff33204b8a1)

A simple and user-friendly JavaScript-based calculator built with HTML, CSS, and JavaScript. This calculator supports basic arithmetic operations, keyboard input, and even expression preprocessing (e.g., `4²` becomes `16` automatically).

---

## 🌟 Features

- **Responsive UI** – Clean and modern interface designed with HTML and CSS.
- **Basic Operations** – Addition, subtraction, multiplication, and division.
- **Advanced Functions:**
  - Square (`²`)
  - Square root (`√`)
  - Power (`^`)
  - Modulo (`%`)
  - Factorial (`!`)
  - Fibonacci sequence calculation
- **Symbol Preprocessing** – Converts special symbols like `²` or `√` into valid expressions.
- **Keyboard Support** – Fully functional through keyboard input for fast and efficient usage.
- **Real-Time Display** – See expressions and results update as you type.

---

## 🚀 How It Works

### User Interface

The calculator has a grid layout with buttons for numbers, operators, and functions. Inputs are displayed in a screen-like area, showing both the current expression and the evaluated result.

### Input Handling

Button clicks and key presses are captured using event listeners. Each symbol or number is appended to the expression string.

### Expression Evaluation

Before evaluation, special characters like `²`, `√`, or `!` are parsed and replaced with JavaScript-compatible syntax. For example:

- `²` → `Math.pow(x, 2)`
- `√` → `Math.sqrt(x)`
- `!` → Custom recursive factorial function
- `Fibonacci(n)` → Uses a recursive or iterative function to compute the nth Fibonacci number

### Error Handling

The calculator includes simple try-catch blocks to gracefully handle invalid expressions or division by zero.

---

## 🧠 Technologies Used

- **HTML5** – For layout and structure.
- **CSS3** – For styling, layout, and responsiveness.
- **JavaScript (ES6)** – Core logic, event handling, expression parsing, and evaluation.

---

## 📦 Installation & Usage

You can clone or download this repository and open the `index.html` file directly in your browser:

```bash
git clone https://github.com/POuria25/JavaScript-Calculator.git
cd JavaScript-Calculator
open index.html
