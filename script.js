let total = 0;
let buffer = '0';
let operator = null;
const screen = document.querySelector('.result');

document.querySelector('.buttons').addEventListener('click', function(e) {
    buttonClick(e.target.innerText);
});

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender()
}

function handleSymbol(value) {
    switch(value) {
        case 'C':
            buffer = '0';
            total = 0
            break
        case '=':
            if (operator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            operator = null;
            buffer = '' + total;
            total = 0
            break
        case '←':
            if (buffer.length == 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        default:
            handleMath(value)
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (total === 0) {
        total = intBuffer
    } else {
        flushOperation(intBuffer);
    }

    operator = value;
    buffer = '0'
}

function flushOperation(intBuffer) {
    if (operator === '+') {
        total += intBuffer
    } else if (operator === '-') {
        total -= intBuffer
    } else if (operator === 'x') {
        total *= intBuffer
    } else {
        total /= intBuffer
    }
}

function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer += value;
    }
    rerender();
}

function rerender() {
    screen.innerText = buffer;
}