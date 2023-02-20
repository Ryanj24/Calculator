//////////////////////// Select HTML elements from DOM /////////////////////

// Select the top display and the value entered by the user
let calculation = document.querySelector("#calculation");
let currentValue = document.querySelector("#currentValue");


// Select the two clear buttons
const clearButton = document.querySelector("#clear");
const allClearButton = document.querySelector("#all-clear");

// Select the operation buttons 
const operationButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#Equal");

// select the number buttons
const numberButtons = document.querySelectorAll(".number");

// select the squared button
const squaredButton = document.querySelector("#squared");

// select the decimal point button
const decimal = document.querySelector("#decimal");

// select the positive and negative button
const positiveNegative = document.querySelector("#posNeg");


/////////////////////// Create functions to perform operations ///////////////

// Add function
const add = function(number1, number2) {
    return number1 + number2;
}

// Subtract function
const subtract = function(number1, number2) {
    return Math.round((number1 - number2) * 100) / 100
}

// Multiply function
const multiply = function(number1, number2) {
    return number1 * number2;
}

// Divide function
const divide = function(number1, number2) {
    if (number1 === 0 | number2 === 0) {
        return "OOPS";
    }
    return Math.round((number1 / number2) * 100) / 100;
}

// Operate function that completes operation
function operate(operator, number1, number2) {

    // If..else if loop to call correct operator function
    if (operator === "+") {
        return add(number1, number2);
    } else if (operator === "-") {
        return subtract(number1, number2);
    } else if (operator === "*") {
        return multiply(number1, number2);
    } else if (operator === "/") {
        return divide(number1, number2);
    }
};

// Define variables to store current total, current calculation and entered value
let displayValue = "", operator = "", numArr = [], result = 0;

numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        // When a number button is clicked, add buttons value to the display 
        // value string
        displayValue += button.value;

        // Display the number to the user
        currentValue.textContent = displayValue;

    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", function() {

        if (Number(displayValue) != 0) {
            numArr.push(Number(displayValue));
        }

        currentValue.textContent = numArr[0];

        calculation.textContent += displayValue;

        displayValue = "";

        // Check what operator button has been pressed
        if (button.value === "+") {
            // Add + to the array for calculation and to the calculation at top of display
            numArr.push("+");
            calculation.textContent += "+"
        } else if (button.value === "-") {
            // Add - to the array for calculation and to the calculation at top of display
            numArr.push("-");
            calculation.textContent += "-"
        } else if (button.value === "*") {
            // Add * to the array for calculation and to the calculation at top of display
            numArr.push("*");
            calculation.textContent += "*"
        } else if (button.value === "/") {
            // Add / to the array for calculation and to the calculation at top of display
            numArr.push("/");
            calculation.textContent += "/"
        }
        
    })
})

equalButton.addEventListener("click", function() {

    calculation.textContent += displayValue;
    
    if (typeof(numArr[numArr.length - 1]) === "string") {
        numArr.push(Number(displayValue));
        displayValue = "";
    }
    result = operate(numArr[1], numArr[0], numArr[2]);
    numArr = []
    numArr.push(result);


    for (let i = 1; i < numArr.length; i++) {
        if (typeof(numArr[i]) === "string") {
            result = operate(numArr[i], numArr[0], numArr[i+1]);
        }
    }
    currentValue.textContent = result;
})


clearButton.addEventListener("click", function() {
    // Remove 1 character from the entered number
    displayValue = displayValue.slice(0, -1);

    // Change the display to reflect the changes
    currentValue.textContent = displayValue;

    
})

allClearButton.addEventListener("click", function() {

    // Clear all the data so the user starts fresh
    displayValue = "";
    currentValue.textContent = "";
    calculation.textContent = "";
    numArr = [];
    operator = "";
    result = 0;
})

decimal.addEventListener("click", function() {
    // Define counter to count if user has already entered a decimal
    let decimalCount = 0;

    // Loop through the current entered value and if there is a decimal, add 1 to the counter
    for (let i = 0; i < displayValue.length; i++) {
        if (displayValue[i] == decimal.value) {
            decimalCount++;
        }
    }

    // If the user hasnt entered a decimal yet then add the decimal to the value
    if (decimalCount === 0) {
        // Add decimal value to the display value
        displayValue += decimal.value;
        // Update the display to include decimal
        currentValue.textContent += decimal.value;
    }
})

squaredButton.addEventListener("click", function() {

    // Take the value on the screen and square it
    if (numArr.length === 0) {
        displayValue = Math.pow(Number(displayValue), 2);
        // Reflect the new squared value to the user
        currentValue.textContent = displayValue;
    } else {
        numArr[0] = Math.pow(numArr[0], 2);

        // Reflect the new squared value to the user
        currentValue.textContent = numArr[0];
    }
})

positiveNegative.addEventListener("click", function() {
    
    if (numArr.length === 0) {
        if (Number(displayValue) > 0) {
            // If so, add a minus sign infront of it
            displayValue = "-" + displayValue;
        } else if (Number(displayValue) < 0) {
            // If number entered is negative then get absolute value 
            displayValue = Math.abs(Number(displayValue));
        }
        currentValue.textContent = displayValue;
    } else {
        if (numArr[0] > 0) {
            // If so, add a minus sign infront of it
            numArr[0] = "-" + numArr[0];
            numArr[0] = Number(numArr[0]);
        } else if (numArr[0] < 0) {
            // If number entered is negative then get absolute value 
            result = Math.abs(numArr[0]);
        }
    
        // Display number to user
        currentValue.textContent = numArr[0];
    }
})