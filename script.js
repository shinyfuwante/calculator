const display = document.querySelector('display');
const mathButtons = document.querySelectorAll('math-buttons');
const clearButtons = document.querySelectorAll('clear-buttons');


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

function operate (a,b, operator) {
    switch (operator) {
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "×":
            return multiply(a,b);
        case "÷":
            return divide(a,b);
        default:
            break;
    }
}

function mathClick(e) {
    console.log(e.target);
    if (e.target.classList.contains('operator')) console.log('operator');
    else if (e.target.classList.contains('digit')) numPress(e.target.innerText);
    else if (e.target.classList.contains('equals')) console.log('equals');
}

function clearClick(e) {
    console.log(e.target);
}

function numPress(digit) {
    //when a button is pressed, it will append the corresponding digit to the text body.
    if (display.innerText.length >= 9) {
        alert('Maximum digits exceeded!');
        return;
    }

    display.innerText += String(digit);
}

function idle() {
    const mathListener = mathButtons.forEach(row => row.addEventListener('click', mathClick));
    const clearListener = clearButtons.forEach(button => button.addEventListener('click', clearClick));
}

idle();