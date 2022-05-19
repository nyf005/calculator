let total;
let currentNum;
let operatorClicked = false;
let lastNum;
let operator;

const displayOperation = document.querySelector("#operation p");
const displayResultDiv = document.querySelector("#result");
const displayResult = document.querySelector("#result p");
displayResult.textContent = 0;

const numBtns = document.querySelectorAll(".num");
numBtns.forEach((numBtn) =>
  numBtn.addEventListener("click", (e) => {
    //   Reset total value if no operator has been clicked (for example after the equal button clicked)
    if (!operatorClicked) {
      total = 0;
    }
    populateDisplay(e);
    displayResultDiv.classList.add("focus");
  })
);

const operationBtns = document.querySelectorAll(".key-op");
operationBtns.forEach((operationBtn) => {
  operationBtn.addEventListener("click", (e) => {
    // Set operatorClicked tot true so we could clear the screen when entering new number
    operatorClicked = true;
    displayResultDiv.classList.add("focus");
    displayOperation.textContent = "";

    lastNum = total ? total : currentNum;
    operator = e.target;
  });
});

const equalBtn = document.querySelector(".equal");
equalBtn.addEventListener("click", () => {
  displayOperation.textContent = `${lastNum} ${operator.textContent} ${currentNum} =`;
  total = operate(operator.getAttribute("data-value"), lastNum, currentNum);
  displayResultDiv.classList.remove("focus");
  displayResult.textContent = total;

  //   Reset values after equal button pressed
  operatorClicked = !operatorClicked;
});

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
  console.log(currentNum);
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
