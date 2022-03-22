$ calc
> 12 + 30
> 42
> 10 * 20
> 200
> q
$


class CalculatorEngine {
    getCurrentOutput() {
        return a string;
    }

    clear() {
        clear internal state
    }

    input(character) {
        you can check and store it

        recalc();
    }

    recalc() {
        do recalculation id possible and set correct output string
    }
}

// command line

let engine = new CalculatorEngine();
let input = null;

while ((input = readline()) != 'q') {
    engine.clear();
    foreach (char in input) {
        engine.input(char);
    }

    console.log("> " + engine.getCurrentOutput());
    console.log("> ");
}


// UI

let buttons = document.querySelectorAll('.action-buttons');
let clear = document.querySelector('.clear-button');
let outputBox = document.querySelector('.output-box');

let engine = new CalculatorEngine();

clear.addEventListener('click', () => engine.clear());
foreach (btn in buttons) {
    btn.addEventListener('click', () {
        let input = btn.dataset.get('input-char');
        engine.input(input);
        outputBox.innerHTML = engine.getCurrentOutput();
    });
}




