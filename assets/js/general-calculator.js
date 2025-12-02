const display = document.getElementById("calc-display");
let current = "";
let operator = "";
let previous = "";

function updateDisplay(value) {
    display.textContent = value;
}

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        // 1. Rəqəmlər
        if (!isNaN(value) || value === ".") {
            current += value;
            updateDisplay(current);
        }

        // 2. AC
        else if (value === "AC") {
            current = "";
            previous = "";
            operator = "";
            updateDisplay(0);
        }

        // 3. +/- 
        else if (value === "+/-") {
            current = String(parseFloat(current || "0") * -1);
            updateDisplay(current);
        }

        // 4. %
        else if (value === "%") {
            current = String(parseFloat(current) / 100);
            updateDisplay(current);
        }

        // 5. Operator seçiləndə
        else if (["+", "-", "*", "/"].includes(value)) {
            if (current === "") return;

            operator = value;
            previous = current;

            // Operator basanda ekranda "previous operator"
            updateDisplay(`${previous} ${operator}`);

            current = "";
        }

        // 6. = basanda
        else if (value === "=") {
            if (operator && previous !== "" && current !== "") {
                const a = parseFloat(previous);
                const b = parseFloat(current);
                let result = 0;

                if (operator === "+") result = a + b;
                if (operator === "-") result = a - b;
                if (operator === "*") result = a * b;
                if (operator === "/") result = b === 0 ? "Error" : a / b;

                updateDisplay(result);

                current = String(result);
                previous = "";
                operator = "";
            }
        }

    });
});
