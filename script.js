//Constants and initial values ---------------------------------------------------------------------
const display = document.querySelector('display');
const runningDisplay = document.querySelector('running-display');
const mathButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const decimalButton = document.querySelector('.decimal');

display.textContent = '0';
let currentOp;
let operandA;
let operandB;

let resetCurrentFlag = false;

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
        return false;
    }
    return Math.round(((a/b) * 100))/100; //rounds to two decimal places, may revisit later.
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

function eval(operator) {
    if (currentOp == undefined || resetCurrentFlag == true) return;
    operandB = display.textContent;
    display.textContent = operate(operandA, operandB, currentOp);
    runningDisplay.textContent = ` ${operandA} ${currentOp} ${operandB} =`
    currentOp = undefined;
    if (display.textContent == 'false') clear();
}

//click functions ---------------------------------------------------------------------------------------------------------
function addNum(number) {
    if (display.textContent == "0" || resetCurrentFlag == true) {
        reset();
    }
    display.textContent += String(number);
}

function addDecimal() {
    if (resetCurrentFlag == true) {
        reset();
        display.textContent = '0';
    }
    if (display.textContent.includes('.')) return;
    display.textContent += '.';
}

function inputOperator(operator) {
    if (currentOp != undefined) eval(operator);
    operandA = display.textContent;
    currentOp = operator;
    runningDisplay.textContent = ` ${operandA} ${currentOp} `
    resetCurrentFlag = true;
}

function reset() {
    display.textContent = '';
    resetCurrentFlag = false;
}

function clear() {
    operandA = null;
    operandB = null;
    currentOp = null;
    runningDisplay.textContent = '';
    display.textContent = '0';
}

function backspace() {
    display.textContent = display.textContent.substring(0, display.textContent.length-1);
    if (display.textContent == '') display.textContent += '0';
}
//Listeners---------------------------------------------------------------------------------------------------------------- 

function idle() {
    mathButtons.forEach(button => button.addEventListener('click', () => addNum(button.textContent)));
    operatorButtons.forEach(button => button.addEventListener('click', () => inputOperator(button.textContent)));
    equalsButton.addEventListener('click', () => eval(equalsButton.textContent));
    clearButton.addEventListener('click', () => clear());
    decimalButton.addEventListener('click', () => addDecimal());
    delButton.addEventListener('click', () => backspace());
    window.addEventListener('keydown', keyboardPress);
}
//Handle keyboard input ---------------------------------------------------------------------------------------------------
function keyboardPress(e) {
    console.log(e.keyCode);
    if (e.key == 'Backspace') delButton.click();
    if (e.key == 'Escape') clearButton.click();
    if (e.key >= 0 || e.key < 10) {
        addNum(e.key);
    }
    if (e.key == '.') addDecimal();
    if (e.key == "*" || e.key == "/" || e.key == "+" || e.key == "-") {
        inputOperator(keyboardToButton(e.key));
    }
    if (e.key == '=' || e.keyCode == '16') eval('=');
}

function keyboardToButton(key) {
    switch (key) {
        case '*':
            return '×';
        case '/':
            return '÷';
        case '+':
        case '-':
            return key;
    }
}

idle();