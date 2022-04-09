//Constants and initial values ---------------------------------------------------------------------
const display = document.querySelector('display');
const mathButtons = document.querySelectorAll('math-buttons');
const clearButtons = document.querySelectorAll('clear-buttons');
let runningSolution = 0;
let lastPressed;
let lastOperator;
display.innerText = '0';

//---------------------------------------------------------------------------------------------------
/* The four mathematical operations
* Add and multiply are fairly basic.
* Subtract uses the first number to subtract from the second.
* Divide rounds and alerts on a divide by 0;
*/ 

function add(a,b) {
    return a+b;
}

function subtract (a,b) {
    return a-b;
}

function multiply (a,b) {
    return a*b;
}

function divide (a,b) {
    if (b == 0) {
        alert('You tried to divide by zero!');
        //maybe clear
        return;
    }
    return Math.round(((a/b) * 100))/100; //rounds to two decimal places, may revisit later.
}

//Checking the button pressed -----------------------------------------------------------------------------

function isNumber(e) {
    return e.target.classList.contains('digit');
}

function isOperator(e) {
    return e.target.classList.contains('operator');
}

function isEquals(e) {
    return e.target.classList.contains('equals')
}

//operate---------------------------------------------------------------------------------------------------
function operate (a,b, operator) {
    switch (operator) {
        case "+":
            return add(+a,+b);
        case "-":
            return subtract(+a,+b);
        case "×":
            return multiply(+a,+b);
        case "÷":
            return divide(+a,+b);
        default:
            break;
    }
}
//click functions ---------------------------------------------------------------------------------------------------------
//TODO implement decimal
function mathClick(e) {
    console.log(e.target);
    //an operator CAN cause operate to occur, this can be replicated into equals;
    //if the there was a prior operator, evaluate the display text.

    if (isOperator(e)) {
        opPress(e);
    } 
    //a number NEVER causes operate() 
    //a number only cares to input itself into the display.
    //if an operator was the last thing pressed, clear display and enter a new number.
    else if (isNumber(e)) {
        if(lastPressed && isOperator(lastPressed)) {
            runningSolution = display.innerText;
            clearDisplay();
        }  
        numPress(e.target.innerText);
        lastPressed = e;
    }
    else if (isEquals(e)) {
        if(lastOperator) {
            display.innerText = operate(runningSolution, display.innerText, lastOperator);
            runningSolution = display.innerText;
            lastOperator = undefined;
        }
        return;
    }
}

function clearClick(e) {
    console.log(e.target);
    if (e.target.classList.contains('clear')) clearDisplay();
    if (e.target.classList.contains('delete')) backspace();
}
//button logic---------------------------------------------------------------------------------------------------------------
function clearDisplay() {
    //if double tapped, remove any memory.
    if (display.innerText == "0") {
        resetState();
    }
    display.innerText = "0";
}

function resetState() {
    runningSolution = 0;
    lastPressed = undefined;
    lastOperator = undefined;
}

function backspace() {
    display.innerText = display.innerText.substring(0, display.innerText.length-1);
}

function numPress(digit) {
    //when a button is pressed, it will append the corresponding digit to the text body.
    if (display.innerText.length >= 9) {
        alert('Maximum digits exceeded!');
        return;
    }
    if (display.innerText == "0") display.innerText = String(digit);
    else display.innerText += String(digit);
}

function opPress(e) {
    if (lastPressed && isOperator(lastPressed)) {
        //do nothing and update operator at the bottom
        console.log('operator pressed when prior was op');
    }
    else if (lastOperator) {
        display.innerText = operate(runningSolution, display.innerText, lastOperator);
    }
    if (!lastPressed || isNumber(lastPressed)) {
        runningSolution = display.innerText;
    } 
    lastOperator = e.target.innerText;
    lastPressed = e;
}
//Listeners---------------------------------------------------------------------------------------------------------------- 

function idle() {
    const mathListener = mathButtons.forEach(row => row.addEventListener('click', mathClick));
    const clearListener = clearButtons.forEach(button => button.addEventListener('click', clearClick));
}

idle();