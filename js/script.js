let currentNum;
let operatorClicked = false;
let lastNum;
let operator;

const displayOperation = document.querySelector("#operation p");
const displayResult = document.querySelector("#result p");
displayResult.textContent = 0;

const numBtns = document.querySelectorAll(".num");
numBtns.forEach((numBtn) => numBtn.addEventListener("click", populateDisplay));

const operationBtns = document.querySelectorAll(".key-op");
operationBtns.forEach((operationBtn) => {
  operationBtn.addEventListener("click", (e) => {
    // Set operatorClicked tot true so we could clear the screen when entering new number
    operatorClicked = true;
    lastNum = currentNum;
    operator = e.target.getAttribute("data-value");
  });
});

const equalBtn = document.querySelector(".equal");
equalBtn.addEventListener("click", () => {
  currentNum = operate(operator, lastNum, currentNum);
  displayResult.textContent = currentNum;
});

function populateDisplay(numBtn) {
  let keyValue = numBtn.target.textContent;
  if (
    (displayResult.textContent == "0" && keyValue != ".") ||
    operatorClicked
  ) {
    displayResult.textContent = "";
  }

  //   Set to false so if we want to enter a number we more digits the screen does not clear each time we click on a number
  operatorClicked = false;
  displayResult.textContent += keyValue;

  currentNum = Number(displayResult.textContent);
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
