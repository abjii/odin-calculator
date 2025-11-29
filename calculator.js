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
      throw new Error("Invalid operator");
  }
}

const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");

function reset() {
  let x = (y = operator = input.value = "");
}

reset();
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (["+", "-", "*", "/"].includes(button.value)) {
      operator = button.value;
      x = Number(input.value);
    } else if (button.value === "=") {
      y = Number(input.value);
      input.value = operate(operator, x, y);
    } else if (button.value === "clear") reset();
    else {
      if (operator != "" && x != "") input.value = "";
      input.value += button.value;
    }
  });
});
