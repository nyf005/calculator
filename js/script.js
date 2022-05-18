const displayOperation = document.querySelector("#operation p");
const displayResult = document.querySelector("#result p");

const numBtns = document.querySelectorAll(".num");
numBtns.forEach((numBtn) => numBtn.addEventListener("click", populateDisplay));

function populateDisplay(numBtn) {
  let keyValue = numBtn.target.textContent;
  if (displayResult.textContent == "0" && keyValue != ".") {
    displayResult.textContent = "";
  }
  displayResult.textContent += keyValue;
}

function operate(operator, num1, num2) {
  let result = 0;

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;

    case "-":
      result = substract(num1, num2);
      break;

    case "*":
      result = multiply(num1, num2);
      break;

    case "/":
      result = divide(num1, num2);

    default:
      break;
  }
  return result;
}

function add(num1, num2) {
  return num1 + num2;
}

function substract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}
