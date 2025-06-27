class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForOperand = false;
        this.shouldResetDisplay = false;
        
        // Initialize theme based on a data attribute or default to light
        document.body.setAttribute('data-theme', 'light'); 
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        // Get all buttons
        const buttons = document.querySelectorAll('.btns');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.addButtonPressEffect(button); // Pass the button directly
                const buttonText = e.target.textContent.trim();
                const isThemeButton = button.querySelector('.bi-moon-fill, .bi-sun-fill');

                // Handle different button types
                if (buttonText >= '0' && buttonText <= '9') {
                    this.inputNumber(buttonText);
                } else if (buttonText === '.') {
                    this.inputDecimal();
                } else if (buttonText === 'C') {
                    this.clear();
                } else if (buttonText === '=') {
                    this.calculate();
                } else if (['+', '-', '*', '/'].includes(buttonText)) {
                    this.inputOperator(buttonText);
                } else if (isThemeButton) { 
                    this.toggleTheme();
                }
            });
        });
