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
    document.getElementById("history").textContent = '';
}