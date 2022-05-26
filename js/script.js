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

// Adding keyboard support
document.addEventListener("keydown", (e) => {
  // Normal digits, Keypad digits and dot
  if (
    (e.key >= 0 && e.key <= 9) ||
    (e.key == "." && !displayResult.textContent.includes("."))
  ) {
    inputDigit(e.key);
  }

  // Arithmetic operators (+, -, *, /)
  if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
    operationBtns.forEach((operationBtn) => {
      if (operationBtn.getAttribute("data-value") == e.key) {
        inputOperator(operationBtn);
      }
    });
  }

  // Equals or Enter
  if (e.key == "=" || e.key == "Enter") {
    inputEquals();
  }

  // Backspace
  if (e.key == "Backspace") {
    deleteDigit();
  }

  // Clear
  if (e.key == "Clear") {
    resetCalculator();
  }
});

percentageBtn.addEventListener("click", (e) => {
  if (currentNum != null || total != null) {
    //  Calculate total before applying percentage if user type something like 9 * 3%
    if (previousNum != null) {
      total = operate(
        operator.getAttribute("data-value"),
        previousNum,
        currentNum
      );
    }
    let previousTotal = total != null ? total : currentNum;
    total = operate(e.target.getAttribute("data-value"), previousTotal, null);

    updateUIAfterCalculation(e.target, previousTotal, "", total);

    // Reset previousNum and currentNum so user can use the actual result for next calculation if needed
    previousNum = null;
    currentNum = total;
  }
});

numBtns.forEach((numBtn) =>
  numBtn.addEventListener("click", (event) =>
    inputDigit(event.target.textContent)
  )
);

operationBtns.forEach((operationBtn) => {
  operationBtn.addEventListener("click", (event) =>
    inputOperator(event.target)
  );
});

equalBtn.addEventListener("click", inputEquals);

clearBtn.addEventListener("click", () => resetCalculator());

delBtn.addEventListener("click", deleteDigit);

// Functions

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

function operate(...args) {
  let result = 0;

  switch (args[0]) {
    case "+":
      result = add(args[1], args[2]);
      break;

    case "-":
      result = substract(args[1], args[2]);
      break;

    case "*":
      result = multiply(args[1], args[2]);
      break;

    case "/":
      result = divide(args[1], args[2]);
      break;

    case "exponent":
      result = Math.pow(args[1], args[2]);
      break;

    case "percentage":
      result = divide(args[1], 100);
      break;

    default:
      break;
  }

  return result;
}

function populateDisplay(digit) {
  //   To prevent removing the 0 if user type on the dot
  if (
    (displayResult.textContent == "0" && digit != ".") ||
    (isOperatorActive && displayResult.textContent != "-")
  ) {
    // Put 0 before dot if it is pressed without 0
    displayResult.textContent = isOperatorActive && digit == "." ? 0 : "";
  }

  // Set to false so if we want to enter a number with more digits the screen does not clear each time we click on a number
  isOperatorActive = false;

  displayResult.textContent += digit;

  currentNum = Number(displayResult.textContent);
}

function inputDigit(digit) {
  //   Reset calculator  if no operator has been pressed after the equals sign
  if (isEqualsActive) {
    resetCalculator();
  }

  // set isEqualsActive to false so when pressing the next digit the display doesn't get cleared
  isEqualsActive = false;

  populateDisplay(digit);
  displayResultDiv.classList.add("focus");
  if (displayResult.textContent.includes(".")) {
    dotBtn.classList.add("disabled");
  }
}

function inputOperator(opBtn) {
  if (currentNum != null) {
    // Set isOperatorActive to true so we could clear the screen when entering new number after an operator is pressed
    isOperatorActive = true;

    // set isEqualsActive to false so we can still use the total of an operation after pressing equal sign
    isEqualsActive = false;

    dotBtn.classList.remove("disabled");
    displayResultDiv.classList.add("focus");
    displayOperation.textContent = "";

    if (previousNum != null) {
      total = operate(
        operator.getAttribute("data-value"),
        previousNum,
        currentNum
      );
      updateUIAfterCalculation(operator, previousNum, currentNum, total);
    }
    // Save the total of the last operation or the current number in the previousNum variable
    previousNum = total != null ? total : currentNum;
    currentNum = null;

    operator = opBtn;
  } else {
    if (!operator && opBtn.getAttribute("data-value") == "-") {
      // Add minus sign if the first number is negative
      displayResult.textContent = "-";
    } else if (
      operator &&
      (operator.getAttribute("data-value") == "*" ||
        operator.getAttribute("data-value") == "/" ||
        operator.getAttribute("data-value") == "exponent") &&
      opBtn.getAttribute("data-value") == "-"
    ) {
      // Add minus sign if the 2nd number is negative
      displayResult.textContent = "-";
      // isOperatorActive = false;
    } else {
      // Multiple clicks on operator
      operator = opBtn;
    }
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

function updateUIAfterCalculation(
  operator,
  operand1,
  operand2,
  calculationResult
) {
  displayResultDiv.classList.remove("focus");

  if (typeof calculationResult == "number") {
    if (calculationResult.toString().includes("e+")) {
      displayOperation.textContent = operand1.toString().includes("e+")
        ? `${round(operand1.toString().split("e+")[0], 8)}E${
            operand1.toString().split("e+")[1]
          } ${operator.textContent} ${operand2} =`
        : `${round(operand1, 8)} ${operator.textContent} ${operand2} =`;

      displayResult.textContent = `${round(
        calculationResult.toString().split("e+")[0],
        8
      )}E${calculationResult.toString().split("e+")[1]}`;
    } else {
      displayOperation.textContent = `${round(operand1, 8)} ${
        operator.textContent
      } ${operand2} =`;
      displayResult.textContent = round(calculationResult, 8);
    }
  } else {
    displayOperation.textContent = `${round(operand1, 8)} ${
      operator.textContent
    } ${operand2} =`;
    displayResult.textContent = calculationResult;
    currentNum = null;
    previousNum = null;
  }
}

function round(value, decimals) {
  return parseFloat(Math.round(value + "e" + decimals) + "e-" + decimals);
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

function deleteDigit() {
  if (displayResult.textContent != 0 && !isEqualsActive && !isOperatorActive) {
    displayResult.textContent = displayResult.textContent.slice(0, -1);
    currentNum = Number(displayResult.textContent);
  } else {
    resetCalculator();
  }
}
