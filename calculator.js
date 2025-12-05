//  Initializations
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const OPERATORS = ["+", "-", "*", "/"];
let x = (y = operator = oldOperator = getY = "");

// Element Selections and Event Listeners
const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");
buttons.forEach((button) => {
  button.addEventListener("click", calculate);
});
document.addEventListener("keydown", calculate);

// Calculation Functions Definitions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) alert("Cannot divide by zero");
  else return a / b;
}
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid operator";
  }
}
function calculate(e) {
  let val = e.target.value;
  if (e.type === "keydown") val = e.key;
  if (OPERATORS.includes(val)) {
    operator = val;
    if (x === "") {
      x = Number(input.value); // assigns first operand after operator is clicked
    } else if (x !== "" && y !== "") {
      // performs calculation if both operands are present
      if (operator == oldOperator || (operator !== oldOperator && !getY)) {
        //make old calculation only IF (operator is same as previous) or IF (operator has changed and second operand is freshly entered, if not
        // freshly entered (in case of consecutive + + + and then - for example) we skip this calculation to allow user to enter new second operand)
        input.value = Number(operate(oldOperator, x, y).toFixed(16));
        x = Number(input.value);
      }
      if (operator !== oldOperator) y = ""; // resets second operand for new operation if operator has changed
    }
    getY = true;
    oldOperator = val;
  } else if (val === "=" || val === "Enter") {
    if (x === "" || y === "") return; // prevents calculation if operands are missing
    input.value = Number(operate(operator, x, y).toFixed(16));
    x = Number(input.value);
    oldOperator = "";
    getY = true;
  } else if (val === "clear") {
    x = y = operator = oldOperator = input.value = "";
  } else if (val === "Backspace" && input.value !== "") {
    // deletes last character from input
    input.value = input.value.slice(0, -1);
    if (y !== "" && operator !== "") {
      y = Number(input.value);
    }
  } else if (DIGITS.includes(val)) {
    // clears input if starting new calculation after previous result
    if (oldOperator === "" && input.value !== "" && getY) {
      x = y = operator = oldOperator = input.value = "";
      getY = false;
    }
    if (input.value.includes(".") && val === ".") return; // prevents multiple decimals
    // gets an operand
    if (getY) {
      input.value = "";
      getY = false;
    }
    input.value += val;
    if (x !== "") y = Number(input.value); // assigns second operand
  }
}
