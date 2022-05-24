let total = null,
  currentNum = null,
  previousNum = null;
let operator = null;
let isOperatorActive = false;
let isEqualsActive = false;

const displayOperation = document.querySelector("#operation p");
const displayResultDiv = document.querySelector("#result");
const displayResult = document.querySelector("#result p");
displayResult.textContent = 0;

const numBtns = document.querySelectorAll(".num");
const operationBtns = document.querySelectorAll(".key-op");
const equalBtn = document.getElementById("equal");
const clearBtn = document.getElementById("clear");
const dotBtn = document.getElementById("dot");
const delBtn = document.getElementById("del");

const percentageBtn = document.getElementById("percentage");

// TODO: Other operators functionnalities
// TODO: Inv functionnality
// TODO: Eventually parenthesis functionnality

numBtns.forEach((numBtn) => numBtn.addEventListener("click", inputDigit));

operationBtns.forEach((operationBtn) => {
  operationBtn.addEventListener("click", inputOperator);
});

equalBtn.addEventListener("click", inputEquals);

clearBtn.addEventListener("click", () => resetCalculator());

delBtn.addEventListener("click", deleteDigit);

function deleteDigit() {
  if (displayResult.textContent != 0 && !isEqualsActive && !isOperatorActive) {
    displayResult.textContent = displayResult.textContent.slice(0, -1);
    currentNum = Number(displayResult.textContent);
  } else {
    resetCalculator();
  }
}

function resetCalculator() {
  total = null;
  currentNum = null;
  previousNum = null;
  operator = null;
  isOperatorActive = false;
  displayOperation.textContent = "";
  displayResult.textContent = "0";
  dotBtn.classList.remove("disabled");
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function updateUIAfterCalculation(
  operator,
  operand1,
  operand2,
  calculationResult
) {
  displayOperation.textContent = `${round(operand1, 8)} ${
    operator.textContent
  } ${operand2} =`;

  displayResultDiv.classList.remove("focus");

  if (typeof calculationResult == "number") {
    displayResult.textContent = round(calculationResult, 8);
  } else {
    displayResult.textContent = calculationResult;
    currentNum = null;
    previousNum = null;
  }
}

function inputEquals() {
  if (previousNum != null && currentNum != null) {
    total = operate(
      operator.getAttribute("data-value"),
      previousNum,
      currentNum
    );

    updateUIAfterCalculation(operator, previousNum, currentNum, total);
    // Set to false so if user type a digit right after equals everything is cleared (in the )
    isOperatorActive = false;
    isEqualsActive = true;
    dotBtn.classList.remove("disabled");
  }
}

function inputOperator(event) {
  if (currentNum != null) {
    // Set isOperatorActive to true so we could clear the screen when entering new number after an operator is pressed
    isOperatorActive = true;

    // set isEqualsActive to false so we can still use the total of an operation after pressing equal sign
    isEqualsActive = false;

    dotBtn.classList.remove("disabled");
    displayResultDiv.classList.add("focus");
    displayOperation.textContent = "";

    if (previousNum != null && currentNum != null) {
      total = operate(
        operator.getAttribute("data-value"),
        previousNum,
        currentNum
      );
      updateUIAfterCalculation(operator, previousNum, currentNum, total);
    }

    previousNum = total != null ? total : currentNum;
    currentNum = null;

    operator = event.target;
  } else {
    if (!operator && event.target.getAttribute("data-value") == "-") {
      // Add minus sign if the first number is negative
      displayResult.textContent = "-";
      operator = null;
    } else if (
      operator &&
      (operator.getAttribute("data-value") == "*" ||
        operator.getAttribute("data-value") == "/" ||
        operator.getAttribute("data-value") == "E" ||
        operator.getAttribute("data-value") == "ˆ") &&
      event.target.getAttribute("data-value") == "-"
    ) {
      // Add minus sign if the 2nd number is negative
      displayResult.textContent = "-";
      // isOperatorActive = false;
    } else {
      // Multiple clicks on operator
      operator = event.target;
    }
  }
}

function inputDigit(event) {
  //   Reset calculator  if no operator has been pressed after the equals sign
  if (isEqualsActive) {
    resetCalculator();
  }

  // set isEqualsActive to false so when pressing the next digit the display doesn't get cleared
  isEqualsActive = false;

  populateDisplay(event);
  displayResultDiv.classList.add("focus");
  if (displayResult.textContent.includes(".")) {
    dotBtn.classList.add("disabled");
  }
}

function populateDisplay(numBtn) {
  let keyValue = numBtn.target.textContent;

  //   To prevent removing the 0 if user type on the dot
  if (
    (displayResult.textContent == "0" && keyValue != ".") ||
    (isOperatorActive && displayResult.textContent != "-")
  ) {
    // Put 0 before dot if it is pressed without 0
    displayResult.textContent = isOperatorActive && keyValue == "." ? 0 : "";
  }

  // Set to false so if we want to enter a number with more digits the screen does not clear each time we click on a number
  isOperatorActive = false;

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
      break;

    case "E":
      result = multiply(num1, Math.pow(10, num2));
      break;

    case "ˆ":
      result = Math.pow(num1, num2);
      break;

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
  return num2 == 0 ? "Cannot divide by 0" : num1 / num2;
}
