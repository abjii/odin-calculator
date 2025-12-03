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
let oldOperator = "";

buttons.forEach((button) => {
  button.addEventListener("click", calculate);
});

function calculate(e) {
  let val = e.target.value;
  // if (val is a digit_value ==> set y based on boolean readyForSecondNumber presence);
  // if (val is an = there must be an x and y set, if pressed multi Times, repeat the opeartion with the last operator);
  // if (val is an operator + - * / ==>
  //         if (x not exist) set x and update readyForSecondNumber to get y
  //         if (y not exist) set y, execute with old operator, and put result in x and set y to empty and readyForSecondNumber, and update operator,

  if (val === "clear") {
    x = y = operator = oldOperator = input.value = "";
    readyForSecondNumber = false;
  } else if (val === "=") {
    y = Number(input.value);
    if (x !== "" && y !== "") {
      input.value = operate(operator, x, y);
      x = Number(input.value);
      readyForSecondNumber = true;
    }
  } else if (["+", "-", "*", "/"].includes(val)) {
    operator = val;
    if (x == "") {
      x = Number(input.value);
      readyForSecondNumber = true;
    } else if (y == "") {
      y = Number(input.value);
      input.value = operate(oldOperator, x, y);
      x = Number(input.value);
      readyForSecondNumber = true;
    } else {
      if (oldOperator == operator) {
        input.value = operate(operator, x, y);
        x = Number(input.value);
      } else {
        y = "";
        readyForSecondNumber = true;
      }
    }
    oldOperator = operator;
  } else {
    // digit pressed
    if (readyForSecondNumber) {
      input.value = "";
      readyForSecondNumber = false;
    }
    input.value += val;
    if (y !== "") y = Number(input.value);
  }
}
