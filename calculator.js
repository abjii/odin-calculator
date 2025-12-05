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

const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");
let x = (y = operator = input.value = "");
let getY = false;
let oldOperator = "";
buttons.forEach((button) => {
  button.addEventListener("click", calculate);
});

function calculate(e) {
  let val = e.target.value;
  if (["+", "-", "*", "/"].includes(val)) {
    operator = val;
    if (x === "") {
      x = Number(input.value); // assigns first operand after operator is clicked
    } else if (x !== "" && y !== "") {
      // performs calculation if both operands are present
      if (operator == oldOperator || (operator !== oldOperator && !getY)) {
        //make old calculation only IF (operator is same as previous) or IF
        // (operator has changed and second operand is freshly entered, if not
        // freshly entered (in case of consecutive + + + and then - for example)
        // we skip this calculation to allow user to enter new second operand)
        input.value = Number(operate(oldOperator, x, y).toFixed(16));
        x = Number(input.value);
      }
      if (operator !== oldOperator) y = ""; // resets second operand for new operation if operator has changed
    }
    getY = true;
    oldOperator = val;
  } else if (val === "=") {
    if (x === "" || y === "") return; // prevents calculation if operands are missing
    input.value = Number(operate(operator, x, y).toFixed(16));
    x = Number(input.value);
    oldOperator = "";
    getY = true;
  } else if (val === "clear") {
    x = y = operator = oldOperator = input.value = "";
  } else {
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
