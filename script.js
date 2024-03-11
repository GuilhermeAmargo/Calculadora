let currentInput = '0';
let previousInput = '';
let operation = null;
const display = document.getElementById('display');

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function inputValue(value) {
    if (currentInput.length < 10) {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        updateDisplay();
    }
}

function inputDecimal(dot) {
    if (!currentInput.includes(dot)) {
        currentInput += dot;
        updateDisplay();
    }
}

function setOperation(op) {
    if (previousInput !== '') {
        calculateResult();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    if (operation !== null) {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operation) {
            case '+':
                currentInput = (prev + current).toString();
                break;
            case '-':
                currentInput = (prev - current).toString();
                break;
            case '*':
                currentInput = (prev * current).toString();
                break;
            case '/':
                if (current !== 0) {
                    currentInput = (prev / current).toString();
                } else {
                    alert("Não é possível dividir por zero.");
                }
                break;
            default:
                return;
        }

        operation = null;
        previousInput = '';
        updateDisplay();
    }
}

function updateDisplay() {
    display.textContent = currentInput.length > 10 ? "ERR" : currentInput;
}

clearDisplay();
