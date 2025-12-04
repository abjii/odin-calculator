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
  return a / b;
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
let currentVal = "";
let previousVal = "";
buttons.forEach((button) => {
  button.addEventListener("click", calculate);
});

function calculate(e) {
  let val = e.target.value;
  if (["+", "-", "*", "/"].includes(val)) {
    operator = val;
    if (x === "") {
      x = Number(input.value);
    } else if (x !== "" && y !== "") {
      if (operator == oldOperator || (operator !== oldOperator && !getY)) {
        input.value = operate(oldOperator, x, y);
        x = Number(input.value);
      }
      if (operator !== oldOperator) y = "";
    }
    getY = true;
    oldOperator = val;
  } else if (val === "=") {
    if (x == "" || y == "") return;
    input.value = operate(operator, x, y);
    x = Number(input.value);
    oldOperator = "";
    getY = true;
  } else if (val === "clear") {
    x = y = operator = oldOperator = input.value = "";
  } else {
    if (getY) {
      input.value = "";
      getY = false;
    }
    input.value += val;
    if (x !== "") y = Number(input.value);
  }
}
