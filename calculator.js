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
let readyForSecondNumber = false;

buttons.forEach((button) => {
  button.addEventListener("click", calculate);
});

function calculate(e) {
  if (["+", "-", "*", "/", "="].includes(e.target.value)) {
    if (e.target.value !== "=") {
      if (operator != "" && e.target.value != operator) {
        operator = e.target.value;
        readyForSecondNumber = true;
        return;
      }
      operator = e.target.value;
    }
    if (x !== "" && y !== "") {
      input.value = operate(operator, x, y);
      x = Number(input.value);
      readyForSecondNumber = true;
    } else if (x == "") {
      x = Number(input.value);
      readyForSecondNumber = true;
    } else if (y == "") {
      y = Number(input.value);
      input.value = operate(operator, x, y);
      x = Number(input.value);
      readyForSecondNumber = true;
    }
  } else if (e.target.value === "clear") {
    x = y = operator = input.value = "";
    readyForSecondNumber = false;
  } else {
    if (readyForSecondNumber) {
      input.value = "";
      readyForSecondNumber = false;
    }
    input.value += e.target.value;
    if (y !== "") y = Number(input.value);
  }
}
