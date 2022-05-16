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
