//Constants and initial values ---------------------------------------------------------------------
const display = document.querySelector('display');
const mathButtons = document.querySelectorAll('math-buttons');
const clearButtons = document.querySelectorAll('clear-buttons');
const decimalButton = document.querySelector('.decimal');
let runningSolution = 0;
let lastPressed;
let lastOperator;
display.innerText = '0';
digitsArray = [0,1,2,3,4,5,6,7,8,9];
ops = ['+','-','/','*'];

//---------------------------------------------------------------------------------------------------
/* The four mathematical operations
* Add and multiply are fairly basic.
* Subtract uses the first number to subtract from the second.
* Divide rounds and alerts on a divide by 0;
*/ 

function add(a,b) {
    return Math.round(((a+b) * 100))/100;
}

function subtract (a,b) {
    return Math.round(((a-b) * 100))/100;
}

function multiply (a,b) {
    return Math.round(((a*b) * 100))/100;
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

function isNumber(e, keyboard = 0) {
    if (keyboard == 1) return e.key in digitsArray;
    return e.target.classList.contains('digit');
}

function isOperator(e, keyboard = 0) {
    if (keyboard == 1) return e.key in ops;
    return e.target.classList.contains('operator');
}

function isEquals(e, keyboard = 0) {
    if (keyboard == 1) return (e.key == "=");
    return e.target.classList.contains('equals');
}

function isDecimal(e, keyboard = 0) {
    if (keyboard == 1) return (e.key == ".");
    return e.target.classList.contains('decimal');
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
function mathClick(e) {
    if (isDecimal(e)) {
        //disable the decimal
        decimalButton.disabled = true;
        //add the decimal by fallthrough
    }
    //an operator CAN cause operate to occur, this can be replicated into equals;
    //if the there was a prior operator, evaluate the display text.

    if (isOperator(e)) {
        opPress(e);
        checkFloating();
    } 
    //a number NEVER causes operate() 
    //a number only cares to input itself into the display.
    //if an operator was the last thing pressed, clear display and enter a new number.
    else if (isNumber(e)) {
        checkFloating();
        if(lastPressed && isOperator(lastPressed)) {
            runningSolution = display.innerText;
            decimalButton.disabled = false;
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
        checkFloating()
        return;
    }
}

function clearClick(e) {
    console.log(e.target);
    if (e.target.classList.contains('clear')) clearDisplay();
    if (e.target.classList.contains('delete')) backspace();
}
//keyboard methods-----------------------------------------------------------------------------------------------------------------
function mathPress(e) {
    console.log(e);
    if (isDecimal(e,1)) {
        //disable the decimal
        decimalButton.disabled = true;
        //add the decimal by fallthrough
    }
    //an operator CAN cause operate to occur, this can be replicated into equals;
    //if the there was a prior operator, evaluate the display text.

    if (isOperator(e,1)) {
        opPress(e);
        checkFloating();
    } 
    //a number NEVER causes operate() 
    //a number only cares to input itself into the display.
    //if an operator was the last thing pressed, clear display and enter a new number.
    else if (isNumber(e,1)) {
        checkFloating();
        if(lastPressed && isOperator(lastPressed,1)) {
            runningSolution = display.innerText;
            decimalButton.disabled = false;
            clearDisplay();
        }  
        numPress(e.key);
        lastPressed = e;
    }
    else if (isEquals(e,1)) {
        if(lastOperator) {
            display.innerText = operate(runningSolution, display.innerText, lastOperator);
            runningSolution = display.innerText;
            lastOperator = undefined;
        }
        checkFloating()
        return;
    }
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
    decimalButton.disabled = false;
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

function checkFloating() {
    console.log('has decimal: ' + display.innerText.includes('.'));
    if (!display.innerText.includes('.')) decimalButton.disabled = false;
    else decimalButton.disabled = true;
}

function addDecimal() {
    if (display.innerText.length >= 9) {
        alert('Maximum digits exceeded!');
        return;
    }
    if (display.innerText == "0") display.innerText = "0.";
    else display.innerText += ".";
    decimalButton.disabled = true;
}
//Listeners---------------------------------------------------------------------------------------------------------------- 

function idle() {
    const mathListener = mathButtons.forEach(row => row.addEventListener('click', mathClick));
    const clearListener = clearButtons.forEach(button => button.addEventListener('click', clearClick));
    const kbListener = window.addEventListener('keypress', keyboardPress);
}
//Handle keyboard input ---------------------------------------------------------------------------------------------------
function keyboardPress(e) {
    console.log(e.key);
    if (e.key >= 0 && e.key <= 9) numPress(e.key);
    if (e.key == '.') addDecimal();
    if (e.key == '=' || e.key === 'Enter');
    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/');
}


idle();