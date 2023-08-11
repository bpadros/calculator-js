const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

/**
 * Checks if the input string matches the valid format for the calculator.
 *
 * @param {string} input - The input string to be validated.
 * @returns {boolean} Returns true if the input matches the valid format, otherwise false.
 */
const isInputValid = (input) => {
   const regex = /^(\d+)\s*([+\-*/])\s*(\d+)(?:\s*=\s*)?$/;
   return regex.test(input);
};

/**
 * Performs arithmetic calculations based on given numbers and an operator.
 *
 * @param {number} num1 - The first number.
 * @param {string} operator - The arithmetic operator (+, -, *, /).
 * @param {number} num2 - The second number.
 * @returns {number|string} The result of the arithmetic operation, or an error message if invalid.
 */
const calculate = (num1, operator, num2) => {
   switch (operator) {
      case "+":
         return num1 + num2;
      case "-":
         return num1 - num2;
      case "/":
         if (num2 === 0) {
            return "Error.";
         }
         return num1 / num2;
      case "*":
         return num1 * num2;
      default:
         return "Invalid option, try again.";
   }
};

/**
 * Handles button click events and updates the calculator display.
 *
 * @param {string} input - The input received from the clicked button.
 */
const handleButtonClick = (input) => {
   const currentText = display.textContent;

   if (
      currentText === "Error." ||
      currentText === "0"
   ) {
      display.textContent = input === "C" ? "0" : input;
      input = input === "0" || input === "C" ? "" : input;
   } else if (input === "=") {
      const result = calculateFromString(currentText);
      display.textContent = result;
      input = result.toString();
   } else {
      display.textContent += input;
      input += input;
   }
};

/**
 * Calculates a result based on a string input in the valid format.
 *
 * @param {string} input - The input string in the valid format: "num1 operator num2".
 * @returns {number|string} The calculated result or an error message if the input is invalid.
 */
const calculateFromString = (input) => {
   if (isInputValid(input)) {
      const regex = /^(\d+)\s*([+\-*/])\s*(\d+)(?:\s*=\s*)?$/;
      const match = input.match(regex);
      const num1 = parseFloat(match[1]);
      const operator = match[2];
      const num2 = parseFloat(match[3]);
      return calculate(num1, operator, num2);
   } else {
      return "Error.";
   }
};

buttons.forEach((button) => {
   button.addEventListener("click", () => {
      handleButtonClick(button.textContent);
   });
});
