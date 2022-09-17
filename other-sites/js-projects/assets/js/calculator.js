/* eslint-disable no-eval */
/* eslint-disable no-unused-vars */
// Main variables and params
const mainInput = document.querySelector('.main-input');
let expression = '';

/**
 * Prints the value to the input field
 *
 * @param {number} number The number to transfer to the input
 */
function print(number) {
  // Clear the field if the value is only '0'
  if (mainInput.value === '0') {
    clearTheInput();
    expression += number;
  } else expression += number;

  mainInput.value = expression;
}

function clearTheInput() {
  // Clear the value and assign to input
  expression = '';
  mainInput.value = expression;
}

function equals() {
  // Calculate the value in the field
  mainInput.value = eval(expression);
  expression = mainInput.value;
}
