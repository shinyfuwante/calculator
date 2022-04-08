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
        case "x":
            return multiply(a,b);
        case "÷":
            return divide(a,b);
        default:
            break;
    }
}
