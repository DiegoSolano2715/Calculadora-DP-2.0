import { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let result = 0;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '*':
          result = currentValue * inputValue;
          break;
        case '/':
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        case '%':
          result = currentValue % inputValue;
          break;
        case '^':
          result = Math.pow(currentValue, inputValue);
          break;
        default:
          return;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (operation && previousValue !== null) {
      performOperation('=');
      setOperation(null);
      setPreviousValue(null);
      setWaitingForOperand(true);
    }
  };

  const squareRoot = () => {
    const inputValue = parseFloat(display);
    const result = Math.sqrt(inputValue);
    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const CalculatorButton = ({ 
    onClick, 
    className = '', 
    children, 
    variant = 'number' 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode; 
    variant?: 'number' | 'operator' | 'equals' | 'clear' 
  }) => {
    const baseClasses = "h-16 text-xl font-semibold rounded-xl transition-all duration-200 transform active:scale-95 shadow-calc-button";
    
    const variantClasses = {
      number: "bg-calculator-number hover:bg-calculator-number-hover text-foreground",
      operator: "bg-calculator-operator hover:bg-calculator-operator-hover text-white",
      equals: "bg-calculator-equals hover:bg-calculator-equals-hover text-white",
      clear: "bg-calculator-clear hover:bg-calculator-clear-hover text-white"
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-main p-6 rounded-3xl shadow-2xl">
      {/* Display */}
      <div className="bg-calculator-display p-6 rounded-2xl mb-6 shadow-calc-display">
        <div className="text-right text-4xl font-light text-foreground min-h-[3rem] flex items-center justify-end overflow-hidden">
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <CalculatorButton onClick={clear} variant="clear" className="col-span-2">
          Clear
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('%')} variant="operator">
          %
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('/')} variant="operator">
          ÷
        </CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton onClick={() => inputNumber('7')}>
          7
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('8')}>
          8
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('9')}>
          9
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('*')} variant="operator">
          ×
        </CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton onClick={() => inputNumber('4')}>
          4
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('5')}>
          5
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('6')}>
          6
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('-')} variant="operator">
          -
        </CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton onClick={() => inputNumber('1')}>
          1
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('2')}>
          2
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('3')}>
          3
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('+')} variant="operator">
          +
        </CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton onClick={() => inputNumber('0')} className="col-span-2">
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDecimal}>
          .
        </CalculatorButton>
        <CalculatorButton onClick={calculate} variant="equals">
          =
        </CalculatorButton>

        {/* Row 6 - Advanced Operations */}
        <CalculatorButton onClick={() => performOperation('^')} variant="operator" className="col-span-2">
          x^y
        </CalculatorButton>
        <CalculatorButton onClick={squareRoot} variant="operator" className="col-span-2">
          √
        </CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;