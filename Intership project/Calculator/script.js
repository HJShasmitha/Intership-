
document.addEventListener("DOMContentLoaded", () => {
    const numbers = document.querySelectorAll('.numbers');
    const result = document.querySelector('.result span');  // Selecting the span inside result
    const equals = document.querySelector('.equals');
    const signs = document.querySelectorAll('.sign');
    const clear = document.querySelector('.clear');
    const negative = document.querySelector('.negative');
    const percent = document.querySelector('.precent');  // Fixed class name

    let firstValue = "";
    let isFirstValue = false;
    let secondValue = "";
    let isSecondValue = false;
    let sign = "";
    let resultValue = 0;

    // Number Buttons Event Listener
    numbers.forEach((number) => {
        number.addEventListener('click', (e) => {
            let value = e.target.innerText;
            if (!isFirstValue) {
                getFirstValue(value);
            } else {
                getSecondValue(value);
            }
        });
    });

    function getFirstValue(el) {
        if (firstValue.length < 10) { // Prevents overflow
            firstValue += el;
            result.innerText = firstValue;
        }
    }

    function getSecondValue(el) {
        if (secondValue.length < 10) { // Prevents overflow
            secondValue += el;
            result.innerText = secondValue;
        }
    }

    // Operator Buttons Event Listener
    signs.forEach((signButton) => {
        signButton.addEventListener('click', (e) => {
            if (firstValue !== "") {
                sign = e.target.innerText;
                isFirstValue = true;
                isSecondValue = false;
            }
        });
    });

    // Equals Button Event Listener
    equals.addEventListener('click', () => {
        if (firstValue !== "" && secondValue !== "") {
            let num1 = parseFloat(firstValue);
            let num2 = parseFloat(secondValue);

            switch (sign) {
                case "+":
                    resultValue = num1 + num2;
                    break;
                case "-":
                    resultValue = num1 - num2;
                    break;
                case "x":
                    resultValue = num1 * num2;
                    break;
                case "/":
                    resultValue = num2 !== 0 ? num1 / num2 : "Error"; // Prevent division by zero
                    break;
                case "%":
                    resultValue = num1 % num2;
                    break;
            }

            result.innerText = resultValue;
            firstValue = resultValue.toString();
            secondValue = "";
            isFirstValue = false;
        }
    });

    // Negative Button Event Listener
    negative.addEventListener('click', () => {
        if (firstValue !== "" && secondValue === "") {
            firstValue = (-parseFloat(firstValue)).toString();
            result.innerText = firstValue;
        } else if (firstValue !== "" && secondValue !== "") {
            secondValue = (-parseFloat(secondValue)).toString();
            result.innerText = secondValue;
        }
    });

    // Percent Button Event Listener
    percent.addEventListener('click', () => {
        if (firstValue !== "" && secondValue === "") {
            firstValue = (parseFloat(firstValue) / 100).toString();
            result.innerText = firstValue;
        } else if (firstValue !== "" && secondValue !== "") {
            secondValue = (parseFloat(secondValue) / 100).toString();
            result.innerText = secondValue;
        }
    });

    // Clear (AC) Button Event Listener
    clear.addEventListener('click', () => {
        result.innerText = "0";
        firstValue = "";
        isFirstValue = false;
        secondValue = "";
        isSecondValue = false;
        sign = "";
        resultValue = 0;
    });
});
