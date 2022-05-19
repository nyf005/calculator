let total, currentNum, previousNum;
let operator;
let operatorClicked = false;

const displayOperation = document.querySelector("#operation p");
const displayResultDiv = document.querySelector("#result");
const displayResult = document.querySelector("#result p");
displayResult.textContent = 0;

const numBtns = document.querySelectorAll(".num");
numBtns.forEach((numBtn) =>
  numBtn.addEventListener("click", (e) => {
    //   Reset total value if no operator has been clicked (for example after the equal button clicked)
    // if (!operatorClicked) {
    //   total = 0;
    // }
    populateDisplay(e);
    displayResultDiv.classList.add("focus");
  })
);

const operationBtns = document.querySelectorAll(".key-op");
operationBtns.forEach((operationBtn) => {
  operationBtn.addEventListener("click", (e) => {
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

    operator = e.target;
  });
});

const equalBtn = document.querySelector(".equal");
equalBtn.addEventListener("click", () => {
  if (currentNum && previousNum) {
    total = operate(
      operator.getAttribute("data-value"),
      previousNum,
      currentNum
    );

    updateUIAfterCalculation(operator, previousNum, currentNum, total);
    //   Reset values after equal button pressed
    operatorClicked = !operatorClicked;
  }
});

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

function populateDisplay(numBtn) {
  let keyValue = numBtn.target.textContent;
  if (
    (displayResult.textContent == "0" && keyValue != ".") ||
    operatorClicked
  ) {
    displayResult.textContent = "";
  }

  // Set to false so if we want to enter a number we more digits the screen does not clear each time we click on a number
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
