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
  if (b === 0) throw new Error("Cannot divide by zero");
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
  button.addEventListener("click", () => {
    if (["+", "-", "*", "/"].includes(button.value)) {
      operator = button.value;
      x = Number(input.value);
      readyForSecondNumber = true;
    } else if (button.value === "=") {
      y = Number(input.value);
      input.value = operate(operator, x, y);
      readyForSecondNumber = false;
    } else if (button.value === "clear") {
      x = y = operator = input.value = "";
      readyForSecondNumber = false;
    } else {
      if (readyForSecondNumber) {
        input.value = "";
        readyForSecondNumber = false;
      }
      input.value += button.value;
    }
  });
});
