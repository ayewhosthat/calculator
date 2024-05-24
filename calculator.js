const add = (a,b) => {return a+b};
const subtract = (a,b) => {return a-b};
const mulitply = (a,b) => {return a*b};
const divide = (a,b) => {return a/b};

const extractOperationParts = function(operation) {
    operation = operation.replace(' ', '').split('');
    // create new object with keys num1, operator, num2
    const operationInfo = {
        'num1': operation[0],
        'operator': operation[1],
        'num2': operation[2],
    };
    return operationInfo;
};

const operate = (operator, num1, num2) => {
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return mulitply(num1, num2);
        case '/': return divide(num1, num2);
    }
}

// create event listener for number keys that will populate the display
const display = document.querySelector('.display');
let currNumber = display.textContent;
const numbers = document.querySelectorAll('.number')
for (let i = 0; i < numbers.length; i++) {
    const btn = numbers[i];
    btn.addEventListener('click', () => {
        if (currNumber === '0') {
            currNumber = btn.textContent;
        } else {
            currNumber = currNumber + btn.textContent;
        }
        display.textContent = currNumber;
    }
    );
}

// add event listener to AC key which resets the display to 0 and loses all memory
const allClear = document.querySelector('#clear-button');
allClear.addEventListener('click', () => {
    currNumber = '0'
    display.textContent = currNumber;
})