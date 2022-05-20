let total, currentNum, previousNum;
let operator;
let operatorClicked = false;

const displayOperation = document.querySelector("#operation p");
const displayResultDiv = document.querySelector("#result");
const displayResult = document.querySelector("#result p");
displayResult.textContent = 0;

const numBtns = document.querySelectorAll(".num");
numBtns.forEach((numBtn) => numBtn.addEventListener("click", inputDigit));

const operationBtns = document.querySelectorAll(".key-op");
operationBtns.forEach((operationBtn) => {
  operationBtn.addEventListener("click", inputOperator);
});

const equalBtn = document.getElementById("equal");
equalBtn.addEventListener("click", inputEquals);

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => resetCalculator());

function resetCalculator() {
  total = 0;
  currentNum = 0;
  previousNum = 0;
  operator = null;
  operatorClicked = false;
  displayOperation.textContent = "";
  displayResult.textContent = "0";
}

function updateUIAfterCalculation(
  operator,
  operand1,
  operand2,
  calculationResult
) {
  displayOperation.textContent = `${operand1} ${operator.textContent} ${operand2} =`;

  displayResultDiv.classList.remove("focus");
  displayResult.textContent = calculationResult;
}

function inputEquals() {
  if (currentNum && previousNum) {
    total = operate(
      operator.getAttribute("data-value"),
      previousNum,
      currentNum
    );

    updateUIAfterCalculation(operator, previousNum, currentNum, total);
    // Set to false so if user type a digit right after equals everything is cleared (in the )
    operatorClicked = false;
  }
}

function inputOperator(input) {
  // Set operatorClicked to true so we could clear the screen when entering new number
  operatorClicked = true;
  displayResultDiv.classList.add("focus");
  displayOperation.textContent = "";

  if (!previousNum && !total) {
    previousNum = currentNum;
  } else {
    total = operate(
      operator.getAttribute("data-value"),
      previousNum,
      currentNum
    );
    updateUIAfterCalculation(operator, previousNum, currentNum, total);
    previousNum = total;
  }

  operator = input.target;
}

function inputDigit(input) {
  //   Reset calculator  if no operator has been clicked after the equals button clicked
  if (!operatorClicked && total) {
    total = 0;
  }
  populateDisplay(input);
  displayResultDiv.classList.add("focus");
}

function populateDisplay(numBtn) {
  let keyValue = numBtn.target.textContent;

  //   To prevent removing the 0 if user type on the dot
  if (
    (displayResult.textContent == "0" && keyValue != ".") ||
    operatorClicked
  ) {
    displayResult.textContent = "";
  }

  // Set to false so if we want to enter a number with more digits the screen does not clear each time we click on a number
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

  return Number.isInteger(result) ? result : result.toFixed(8).toString();
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
