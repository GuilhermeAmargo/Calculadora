let originalHistory = ''; 

function infixToPostfix(expression) {
    let stack = [];
    let output = [];
    let precedence = {'+': 1, '-': 1, '*': 2, '/': 2};
    let operators = /[+\-*\/]/;
    let tokens = expression.split(/(?=[+\-*\/()])|(?<=[+\-*\/()])/);

    tokens.forEach(token => {
        if (token.trim().match(/^\d+$/)) {
            output.push(token.trim());
        } else if (operators.test(token)) {
            while (stack.length && precedence[token] <= precedence[stack[stack.length - 1]]) {
                output.push(stack.pop());
            }
            stack.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        }
    });

    while (stack.length) {
        output.push(stack.pop());
    }

    return output.join(' ');
}

function postfixToInfix(expression) {
    if (!expression.trim()) {
        return '';
    }

    let stack = [];

    for (let token of expression.split(' ')) {
        if (token.match(/^\d+$/)) {
            stack.push(token);
        } else {
            let operand2 = stack.pop();
            let operand1 = stack.pop();
            stack.push(`(${operand1} ${token} ${operand2})`);
        }
    }

    return stack[0];
}

function updateExpression() {
    const notationType = document.querySelector('input[name="notacao"]:checked').value;
    const display = document.getElementById('display');
    const history = document.getElementById('history');
    let expression = display.textContent.trim();
    
    if (notationType === 'pos') {
        display.textContent = infixToPostfix(expression);
    } else {
        display.textContent = postfixToInfix(expression);
    }
}

function updateHistory() {
    const notationType = document.querySelector('input[name="notacao"]:checked').value;
    const history = document.getElementById('history');
    
    if (originalHistory !== '') {
        if (notationType === 'pos') {
            history.textContent = infixToPostfix(originalHistory);
        } else {
            history.textContent = postfixToInfix(originalHistory);
        }
    }
}

document.querySelectorAll('input[name="notacao"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateExpression();
        updateHistory();
    });
});

function clearDisplay() {
    document.getElementById("display").textContent = '0';
    document.getElementById("history").textContent = '';
}

function addToDisplay(value) {
    let display = document.getElementById("display");
    if (display.textContent === '0') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

function addOperator(operator) {
    const display = document.getElementById("display");
    display.textContent += operator;
}

function calculate() {
    let display = document.getElementById("display");
    const history = document.getElementById("history");
    try {
        let result = eval(display.textContent);
        originalHistory = `${display.textContent} = ${result}`;
        history.textContent = originalHistory;
        display.textContent = result.toString();
    } catch (e) {
        display.textContent = "Erro";
    }
}