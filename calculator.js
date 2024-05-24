// declare global variables to be used when evaluating 
let usedOperator = true;
let expression = '';
const display = document.querySelector('.display');
let enteredFirstNumber = false;
let newNumber = false;

const add = (a,b) => {return a+b};
const subtract = (a,b) => {return a-b};
const multiply = (a,b) => {return a*b};
const divide = (a,b) => {return a/b};

const extractOperationParts = function(operation) {
    let num1;
    let num2;
    let op;
    for (let k = 0; k < operation.length; k++) {
        let char = operation[k];
        if (['*', '/', '+', '-'].includes(char)) {
            op = char;
            const index = operation.indexOf(char);
            num1 = operation.slice(0, index);
            num2 = operation.slice(index+1);
        }
    }
    // create new object with keys num1, operator, num2
    const operationInfo = {
        'num1': operation[0],
        'operator': operation[1],
        'num2': operation[2],
    };
    return operationInfo;
};

const operate = (operator, num1, num2) => {
    num1 = parseInt(num1);
    num2 = parseInt(num2);
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
    }
}

const numbers = document.querySelectorAll('.number');
for (let i = 0; i < numbers.length; i++) {
    let num = numbers[i];
    num.addEventListener('click', () => {
        if (!enteredFirstNumber || newNumber) {
            display.textContent = num.textContent;
            enteredFirstNumber = true;
            newNumber = false;
        } else if (enteredFirstNumber) {
            // first number already entered
            display.textContent = display.textContent + num.textContent;
        }
        expression = expression + num.textContent;
    });
}

// add event listener to AC key which resets the display to 0 and loses all memory
const allClear = document.querySelector('#clear-button');
allClear.addEventListener('click', () => {
    enteredFirstNumber = false;
    expression = '';
    display.textContent = '0';
    newNumber = false;
})

// add event listener for operations
const ops = document.querySelectorAll('.operator');
for (let i = 0; i < ops.length; i++) {
    op = ops[i];
    op.addEventListener('click', () => {
        if (!usedOperator) {
            // if we have not inputted a second operator we can add the symbol to the expression as 
            // if we have, then we must evaluate the lhs of the operator
            let expr = extractOperationParts(expression);
        let result = operate(expr['operator'], expr['num1'], expr['num2']);
        display.textContent = result;
        }
        console.log(op.textContent);
        usedOperator = !usedOperator;
        expression = expression + op.textContent;
        newNumber = true;
    })
}

// add event listener for equals sign
const equals = document.querySelector('.equals');
equals.addEventListener('click', () => {
    let expr = extractOperationParts(expression);
    let result = operate(expr['operator'], expr['num1'], expr['num2']);
    display.textContent = result;
    usedOperator = false;
    newNumber = false;
});