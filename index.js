const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const screen = calculator.querySelector('.calculator__output');
const result = calculator.querySelector('.calculator__key--enter');

class mathError {
    constructor() {
        screen.innerHTML = 'Math error';
        setTimeout(() => screen.innerHTML = ' ', 600);
    }
}

class syntaxError {
    constructor() {
        screen.innerHTML = 'Syntax Error';
        setTimeout(() => screen.innerHTML = ' ', 600);
    }
}

class evaluate {
    constructor() {
        console.log('screen : ', screen.innerHTML);

        screen.innerHTML = eval(screen.innerHTML);
        if (String(screen.innerHTML) == 'NaN') {
            new mathError();
        }
    }
}

class Empty {
    constructor() {
        this.flag = false,
            this.isEmpty = function (value) {
                if (value.length === 0) {
                    this.flag = true;
                } else {
                    this.flag = false;
                }
                return this.flag;
            }
    }
}

class operations {
    constructor(event) {
        if (event.target.matches('button')) {
            if (event.target.innerHTML === '=') {
                try {
                    let isEmpty = new Empty();
                    let flag = isEmpty.isEmpty(screen.innerHTML);
                    if (!flag && typeof (eval(screen.innerHTML)) != 'undefined') {
                        new evaluate();
                    }
                }
                catch (error) {
                    new syntaxError();
                }
            }
            else if (event.target.id === 'c') {
                screen.innerHTML = '';
            }
            else {
                screen.innerHTML += event.target.id;
            }
        }
    }
}

keys.addEventListener('click', (event) => {
    new operations(event);
})

document.addEventListener('keydown', (event) => {
    class colorChange {
        constructor(key) {
            let color = document.getElementById(key).style.backgroundColor;
            setTimeout(() => document.getElementById(key).style.backgroundColor = color, 100);
            document.getElementById(key).style.backgroundColor = 'rgb(250, 192, 150)';
        }
    }

    if (event.key === '=' || event.key === 'Enter') {
        new colorChange('=')
        try {
            if (typeof (eval(screen.innerHTML)) != 'undefined') {
                new evaluate();
            }
        }
        catch (error) {
            new syntaxError();
        }
    }
    else if (event.key === 'c') {
        new colorChange(event.key);
        screen.innerHTML = ' ';
    }
    else if (event.key === 'Backspace') {
        let text = screen.innerHTML;
        text = text.replace(text[text.length - 1], '');
        screen.innerHTML = text;
    }
    else {
        const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '*', '/', '.'];
        if (arr.includes(event.key, 0) === true) {      //Start the search at position 0
            new colorChange(event.key);
            screen.innerHTML += event.key;
        }
    }
})