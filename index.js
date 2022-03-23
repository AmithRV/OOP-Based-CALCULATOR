class CalculatorEngine {
    constructor() {
        let result = 0;
        let reset = false;
        this.opValues = ["+", "-", "*", "/"];

        this.isNumeric = function (num) {
            let flag = !isNaN(num) && isFinite(num);
            return flag;
        };

        this.convertExpression = function (s) {
            if (s.length === 0) return 0;

            var a = [];
            a = s.split(" ");
            for (var i = 0; i < a.length; i++) {
                if (this.isNumeric(a[i])) {
                    a[i] = Number(a[i]);
                }
            }
            return a;
        }

        this.multiplyOrDivide = function (a) {
            var total = 0;
            if (a.indexOf('*') !== -1 || a.indexOf('/') !== -1) {
                for (var i = 0; i < a.length; i++) {
                    try {
                        switch (a[i]) {
                            case '*':
                                total = a[i - 1] * a[i + 1];
                                a.splice(i - 1, 3, total);
                                i--;
                                break;
                            case '/':
                                if (a[i + 1] === 0) {
                                    throw new Error("dividing by zero");
                                } else {
                                    total = a[i - 1] / a[i + 1];
                                }
                                a.splice(i - 1, 3, total);
                                i--;
                                break;
                            default:
                                break;
                        }
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }
            return a;
        }

        this.addOrSubtract = function (a) {
            var total = 0;
            if (a.indexOf('+') !== -1 || a.indexOf('-') !== -1) {
                for (var i = 0; i < a.length; i++) {
                    try {
                        switch (a[i]) {
                            case '+':
                                total = a[i - 1] + a[i + 1];
                                a.splice(i - 1, 3, total);
                                i--;
                                break;
                            case '-':
                                total = a[i - 1] - a[i + 1];
                                a.splice(i - 1, 3, total);
                                i--;
                                break;
                            default:
                                break;
                        }
                    } catch (e) {
                        console.log(e.name + ': ' + e.message);
                    }
                }
            }
            return a;
        }

        this.equals = function (s) {
            if (s.length === 0) return "";

            let a = this.convertExpression(s);
            if (a.length === 0)
                result = 0;

            //order of operations
            a = this.multiplyOrDivide(a);
            a = this.addOrSubtract(a);

            try {
                if (a.length !== 1) {
                    throw new Error("Order of operations incomplete");
                }
                result = a[0];
            } catch (e) {
                console.log(e.name + ': ' + e.message);
                result = "error";
            }
            return result;
        }
    }
}

let inti = function () {
    let inputOutput = document.getElementById("calculator__output");
    let calculate = function (e) {
        let element = e.target;
        let op = element.id;
        let engine = new CalculatorEngine();

        try {
            if (engine.isNumeric(op)) {
                inputOutput.value += op;
            } else if (op === ".") {
                if (engine.isNumeric(inputOutput.value.substr(-1))) { // if the last digit is not numeric the , is not added
                    inputOutput.value += op;
                }
            } else if (engine.opValues.indexOf(op) !== -1) { //to check if the operator is valid i.e available in the opVals array
                if (engine.opValues.indexOf(inputOutput.value.substr(-2, 1)) === -1) {
                    inputOutput.value += " " + op + " ";
                }
            }
            else if (op === "c") {
                inputOutput.value = '';
            } else if (op === "=") {
                inputOutput.value = engine.equals(inputOutput.value);
            }
        } catch (error) {
            console.log('error : ', error);
        }
    };

    (function () {
        let calc = document.getElementById('calculator');
        let buttons = calc.getElementsByTagName('button');

        try {
            let i = 0;
        } catch (error) {
            console.log('error : ', error);
        }

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', calculate);
        }
    })();

}
window.onload = inti;