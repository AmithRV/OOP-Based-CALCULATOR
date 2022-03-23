var setDecimal = false; // to avoide multiple decimal points

class CalculatorEngine {
    constructor() {
        let result = 0;
        let reset = false;
        this.operatorValues = ["+", "-", "*", "/"];

        this.isNumeric = function (number) {
            let flag = !isNaN(number) && isFinite(number);
            return flag;
        };

        this.convertExpression = function (stringExpression) {
            if (stringExpression.length === 0) return 0;

            var equationArray = [];
            equationArray = stringExpression.split(" ");
            for (var i = 0; i < equationArray.length; i++) {
                if (this.isNumeric(equationArray[i])) {
                    equationArray[i] = Number(equationArray[i]);
                }
            }
            return equationArray;
        }

        this.multiplyOrDivide = function (equation) {
            var total = 0;
            if (equation.indexOf('*') !== -1 || equation.indexOf('/') !== -1) {
                for (var i = 0; i < equation.length; i++) {
                    try {
                        switch (equation[i]) {
                            case '*':
                                if (equation[i + 1] == '') {
                                    throw new Error("syntax error");
                                } else {
                                    total = equation[i - 1] * equation[i + 1];
                                    equation.splice(i - 1, 3, total);
                                    i--;
                                    break;
                                }

                            case '/':
                                if (equation[i + 1] === 0) {
                                    throw new Error("dividing by zero");
                                } else {
                                    total = equation[i - 1] / equation[i + 1];
                                    equation.splice(i - 1, 3, total);
                                    i--;
                                }
                                break;
                            default:
                                break;
                        }
                    } catch (error) {
                        console.log(error.message);
                    }
                }
            }
            return equation;
        }

        this.addOrSubtract = function (equation) {
            var total = 0;
            if (equation.indexOf('+') !== -1 || equation.indexOf('-') !== -1) {
                for (var i = 0; i < equation.length; i++) {
                    try {
                        switch (equation[i]) {
                            case '+':
                                if (equation[i + 1] == '') {
                                    throw new Error("syntax error");
                                } else {
                                    total = equation[i - 1] + equation[i + 1];
                                    equation.splice(i - 1, 3, total);
                                    i--;
                                }
                                break;
                            case '-':
                                if (equation[i + 1] == '') {
                                    throw new Error("syntax error");
                                } else {
                                    total = equation[i - 1] - equation[i + 1];
                                    equation.splice(i - 1, 3, total);
                                    i--;
                                }
                                break;
                            default:
                                break;
                        }
                    } catch (error) {
                        console.log(error.name + ': ' + error.message);
                    }
                }
            }
            return equation;
        }

        this.equals = function (equation) {
            if (equation.length === 0) return "";

            let equationArray = this.convertExpression(equation);
            if (equationArray.length === 0)
                result = 0;

            //order of operations
            equationArray = this.multiplyOrDivide(equationArray);
            equationArray = this.addOrSubtract(equationArray);

            try {
                if (equationArray.length !== 1) {
                    throw new Error("Order of operations incomplete");
                } else {
                    result = equationArray[0];
                }

            } catch (error) {
                console.log(error.name + ': ' + error.message);
                result = "errorr";
            }
            if (String(result) == 'NaN') {
                result = "error";
            }

            return result;
        }
    }
}

let inti = function () {
    let inputOutput = document.getElementById("calculator__output");
    let calculate = function (event) {
        let element = event.target;
        let op = element.id;
        let engine = new CalculatorEngine();
        let operators = engine.operatorValues;

        try {
            if (engine.isNumeric(op)) {
                inputOutput.value += op;
            } else if (op === ".") {
                if (engine.isNumeric(inputOutput.value.substr(-1)) && setDecimal === false) {
                    setDecimal = true;
                    inputOutput.value += op;
                }
            } else if (operators.indexOf(op) !== -1) { //to check if the operator is valid i.e available in the opVals array
                setDecimal = false;
                if (operators.indexOf(inputOutput.value.substr(-2, 1)) === -1) {
                    inputOutput.value += " " + op + " ";
                }
            }
            else if (op === "c") {
                setDecimal = false;
                inputOutput.value = '';
            } else if (op === "=") {
                inputOutput.value = engine.equals(inputOutput.value);
            }
        } catch (error) {
            console.log('error : ', error);
        }
    };

    (function () {
        let calculator = document.getElementById('calculator');
        let buttons = calculator.getElementsByTagName('button');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', calculate);
        }
    })();
}
window.onload = inti;

/**
 working in console
 ---------------------
 create an object of calculatorEngine(),
 let  engine = new calculatorEngine();
 engine.multiplyOrDivide([10*4]);
 
*/