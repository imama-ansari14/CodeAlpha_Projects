class Calculator {
  constructor() {
    this.display = document.getElementById("display");
    this.currentInput = "0";
    this.previousInput = "";
    this.operator = null;
    this.waitingForOperand = false;
    this.shouldResetDisplay = false;

    document.body.setAttribute("data-theme", "light");
    this.initializeEventListeners();
    this.updateDisplay();
  }

  initializeEventListeners() {
    const buttons = document.querySelectorAll(".btns");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.addButtonPressEffect(button);
        const buttonText = e.target.textContent.trim();
        const isThemeButton = button.querySelector(
          ".bi-moon-fill, .bi-sun-fill"
        );

        if (buttonText >= "0" && buttonText <= "9") {
          this.inputNumber(buttonText);
        } else if (buttonText === ".") {
          this.inputDecimal();
        } else if (buttonText === "C") {
          this.clear();
        } else if (buttonText === "=") {
          this.calculate();
        } else if (["+", "-", "*", "/"].includes(buttonText)) {
          this.inputOperator(buttonText);
        } else if (isThemeButton) {
          this.toggleTheme();
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      this.handleKeyboardInput(e);
    });
  }

  addButtonPressEffect(button) {
    button.style.transform = "scale(0.95)";
    button.style.transition = "transform 0.1s ease";

    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 100);
  }

  inputNumber(number) {
    if (this.waitingForOperand || this.shouldResetDisplay) {
      this.currentInput = number;
      this.waitingForOperand = false;
      this.shouldResetDisplay = false;
    } else {
      this.currentInput =
        this.currentInput === "0" ? number : this.currentInput + number;
    }
    this.updateDisplay();
  }

  inputOperator(nextOperator) {
    const inputValue = parseFloat(this.currentInput);

    if (this.previousInput === "") {
      this.previousInput = inputValue;
    } else if (this.operator) {
      const currentValue = this.previousInput || 0;
      const newValue = this.performCalculation(
        currentValue,
        inputValue,
        this.operator
      );

      this.currentInput = String(newValue);
      this.previousInput = newValue;
      this.updateDisplay();
    }

    this.waitingForOperand = true;
    this.operator = nextOperator;
  }

  inputDecimal() {
    if (this.waitingForOperand) {
      this.currentInput = "0.";
      this.waitingForOperand = false;
    } else if (this.currentInput.indexOf(".") === -1) {
      this.currentInput += ".";
    }
    this.updateDisplay();
  }

  clear() {
    this.currentInput = "0";
    this.previousInput = "";
    this.operator = null;
    this.waitingForOperand = false;
    this.shouldResetDisplay = false;
    this.display.classList.remove("error-animation");
    this.updateDisplay();
  }

  calculate() {
    const inputValue = parseFloat(this.currentInput);

    if (this.previousInput !== "" && this.operator) {
      const currentValue = this.previousInput || 0;
      const newValue = this.performCalculation(
        currentValue,
        inputValue,
        this.operator
      );

      this.currentInput = String(newValue);
      this.previousInput = "";
      this.operator = null;
      this.waitingForOperand = false;
      this.shouldResetDisplay = true;
      this.updateDisplay();
    }
  }

  performCalculation(firstOperand, secondOperand, operator) {
    let result;

    switch (operator) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "*":
        result = firstOperand * secondOperand;
        break;
      case "/":
        if (secondOperand === 0) {
          this.showError("Error");
          return firstOperand;
        }
        result = firstOperand / secondOperand;
        break;
      default:
        return secondOperand;
    }
    return Math.round((result + Number.EPSILON) * 100000000) / 100000000;
  }

  updateDisplay() {
    let displayValue = this.currentInput;

    if (Math.abs(parseFloat(displayValue)) > 999999999) {
      displayValue = parseFloat(displayValue).toExponential(6);
    }

    if (displayValue.includes(".") && displayValue.length > 10) {
      displayValue = parseFloat(displayValue).toFixed(8);
    }
    if (displayValue.length > 12) {
      displayValue = displayValue.substring(0, 12);
    }

    this.display.textContent = displayValue;
  }

  showError(message) {
    this.display.textContent = message;
    this.display.style.color = "#ff4444";
    this.display.classList.add("error-animation");

    setTimeout(() => {
      this.clear();
      this.display.style.color = "";
      this.display.classList.remove("error-animation");
    }, 1500);
  }

  toggleTheme() {
    const body = document.body;
    const calculator = document.querySelector(".calculator");
    const screen = document.querySelector(".screen");
    const buttons = document.querySelectorAll(".btns");
    const themeButtonIcon = document.querySelector(".btns .bi");

    const currentTheme = body.getAttribute("data-theme");

    if (currentTheme === "light") {
      body.setAttribute("data-theme", "dark");
      body.style.backgroundColor = "#1a1a1a";
      calculator.style.backgroundColor = "#222";
      screen.style.backgroundColor = "#6e6e6c";

      buttons.forEach((btn) => {
        if (!btn.querySelector("i")) {
          btn.style.backgroundColor = "#bdbdba";
          btn.style.color = "#000";
        }
      });

      if (themeButtonIcon) {
        themeButtonIcon.classList.remove("bi-moon-fill");
        themeButtonIcon.classList.add("bi-sun-fill");
      }
    } else {
      body.setAttribute("data-theme", "light");
      body.style.backgroundColor = "#f0f0f0";
      calculator.style.backgroundColor = "#fff";
      screen.style.backgroundColor = "#333";

      buttons.forEach((btn) => {
        if (!btn.querySelector("i")) {
          btn.style.backgroundColor = "#e0e0e0";
          btn.style.color = "#000";
        }
      });

      if (themeButtonIcon) {
        themeButtonIcon.classList.remove("bi-sun-fill");
        themeButtonIcon.classList.add("bi-moon-fill");
      }
    }
  }

  handleKeyboardInput(e) {
    if (e.key >= "0" && e.key <= "9") {
      this.inputNumber(e.key);
    }

    switch (e.key) {
      case "+":
        this.inputOperator("+");
        break;
      case "-":
        this.inputOperator("-");
        break;
      case "*":
        this.inputOperator("*");
        break;
      case "/":
        e.preventDefault();
        this.inputOperator("/");
        break;
      case "=":
      case "Enter":
        this.calculate();
        break;
      case ".":
        this.inputDecimal();
        break;
      case "Escape":
      case "c":
      case "C":
        this.clear();
        break;
      case "Backspace":
        this.backspace();
        break;
    }
  }

  backspace() {
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = "0";
    }
    this.updateDisplay();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new Calculator();
});