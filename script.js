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

function addParenthesis(parenthesis) {
    const display = document.getElementById("display");
    let currentText = display.textContent;
    let openParens = (currentText.match(/\(/g) || []).length;
    let closeParens = (currentText.match(/\)/g) || []).length;

    if (openParens > closeParens && parenthesis === ')' && !isNaN(currentText[currentText.length - 1])) {
        display.textContent += ')';
    } else if (parenthesis === '(') {
        if (isNaN(currentText[currentText.length - 1]) || currentText === '0') {
            if (currentText === '0') {
                display.textContent = '(';
            } else {
                display.textContent += '(';
            }
        }
    }
}

function calculate() {
    let display = document.getElementById("display");
    try {
        let result = eval(display.textContent);
        document.getElementById("history").textContent = display.textContent + "=" + result;
        display.textContent = result.toString();
    } catch (e) {
        display.textContent = "Erro";
    }
}

function clearDisplay() {
    document.getElementById("display").textContent = "0";
    document.getElementById("history").textContent = "";
}

function changeInfixe() {
    const display = document.getElementById("display");
    const currentExpression = display.textContent;

    const isOperator = (char) => ['+', '-', '*', '/'].includes(char);
    const getPrecedence = (operator) => {
        switch (operator) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            default:
                return 0;
        }
    };

    const infixToPostfix = (expression) => {
        let outputQueue = [];
        let operatorStack = [];

        for (let i = 0; i < expression.length; i++) {
            const token = expression[i];
            if (!isNaN(token)) {
                outputQueue.push(token);
            } else if (isOperator(token)) {
                while (
                    operatorStack.length > 0 &&
                    getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(token)
                ) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(token);
            } else if (token === '(') {
                operatorStack.push(token);
            } else if (token === ')') {
                while (operatorStack[operatorStack.length - 1] !== '(') {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop();
            }
        }

        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }

        return outputQueue.join('');
    };

    const postfixExpression = infixToPostfix(currentExpression);
    document.getElementById("history").textContent = postfixExpression;
}

function changePosfixe() {
    const display = document.getElementById("display");
    const currentExpression = display.textContent;

    const stack = [];
    let operand = '';

    for (let token of currentExpression) {
        if (!isNaN(token) || token === '.') {
            operand += token;
        } else {
            if (operand !== '') {
                stack.push(operand);
                operand = '';
            }
            let operand2 = stack.pop();
            let operand1 = stack.pop();
            let result = '(' + operand1 + token + operand2 + ')';
            stack.push(result);
        }
    }

    if (operand !== '') {
        stack.push(operand);
    }

    document.getElementById("history").textContent = stack[0];
}

