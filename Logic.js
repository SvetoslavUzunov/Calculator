let digits = document.querySelectorAll(".btn-default");
let result = document.querySelector("#result");
let input = document.querySelector(".form-control");
let digitsAfterOperator = "";
let isPrint = false;

// Digits
const clickDigits = () => {
  for (let item of digits) {
    item.addEventListener("click", (e) => {
      if (isPrint) {
        result.value = "";
        digitsAfterOperator = "";
        input.dataset.current = "";
      }
      if (result.value == "" && e.target.value == ".") {
        isPrint = false;
        result.value += "0.";
        digitsAfterOperator += result.value;
        return;
      }
      result.value += e.target.value;
      digitsAfterOperator += e.target.value;
      isPrint = false;
    });
  }
};
clickDigits();

// Operators
const clickOperators = () => {
  let operation = document.querySelectorAll(".btn-primary");
  for (let item of operation) {
    item.addEventListener("click", (e) => {
      if (result.value != "") {
        result.value += e.target.value;
        input.dataset.operation = e.target.value;
        input.dataset.current = digitsAfterOperator;
        digitsAfterOperator = "";
      }
    })
  }
};
clickOperators();

// Calculate
const calculate = () => {
  switch (input.dataset.operation) {
    case "+":
      result.value =
        parseFloat(input.dataset.current) + parseFloat(digitsAfterOperator);
      break;
    case "-":
      result.value =
        parseFloat(input.dataset.current) - parseFloat(digitsAfterOperator);
      break;
    case "x":
      result.value =
        parseFloat(input.dataset.current) * parseFloat(digitsAfterOperator);
      break;
    case "/":
      if (input.dataset.current != "0" && digitsAfterOperator == "0") {
        result.value = "Cannot divide by zero";
      } else {
        if (input.dataset.current == "0" && digitsAfterOperator == "0") {
          result.value = "Result is undefined";
        } else {
          result.value =
            parseFloat(input.dataset.current) / parseFloat(digitsAfterOperator);
        }
      }
      // if (result.value.length > 20) {
      //   let fixedValue = parseFloat(result.value).toFixed(15);
      //   result.value = fixedValue;
      // }
      break;
    default:
      break;
  }
};

// Print
let isClickOnModul = false;
const print = () => {
  document.querySelector(".btn-danger").addEventListener("click", () => {
    if (isClickOnModul) {
      let value = parseFloat(result.value) % parseFloat(digitsAfterOperator);
      result.value = value;
      isClickOnModul = false;
      return;
    }
    calculate();
    isPrint = true;
  })
};
print();

// Clear all 
const clear = () => {
  document.querySelector(".btn-clear").addEventListener("click", () => {
    result.value = "";
    input.dataset.current = "";
    digitsAfterOperator = "";
  })
};
clear();

// Remove last symbol
const back = () => {
  document.querySelector(".btn-back").addEventListener("click", () => {
    let copyStr = "";
    for (let i = 0; i < result.value.length - 1; i++) {
      copyStr += result.value[i];
    }
    result.value = copyStr;
    digitsAfterOperator = copyStr;
  })
};
back();

// Procent
const procent = () => {
  document.querySelector(".btn-procent").addEventListener("click", () => {
    let value = parseFloat(result.value) / 100;
    result.value = value;
    digitsAfterOperator = result.value;
  })
};
procent();

// Pow
const pow = () => {
  document.querySelector(".btn-pow").addEventListener("click", () => {
    let value = parseFloat(result.value);
    result.value = Math.pow(value, 2);
    digitsAfterOperator = result.value;
  })
};
pow();

// Plus/Minus
const plusMinus = () => {
  let value = "";
  document.querySelector(".btn-plusMinus").addEventListener("click", () => {
    if (result.value != "") {
      if (!result.value.includes("-")) {
        value = result.value;
        result.value = `-${value}`;
        digitsAfterOperator = result.value;
      } else {
        result.value = value;
        digitsAfterOperator = result.value;
      }
    }
  })
};
plusMinus();

// Modul
const modul = () => {
  document.querySelector(".btn-modul").addEventListener("click", () => {
    result.value += " Mod ";
    digitsAfterOperator = "";
    isClickOnModul = true;
  })
};
modul();

// Square
const square = () => {
  document.querySelector(".btn-square").addEventListener("click", () => {
    let value = parseFloat(result.value);
    result.value = Math.sqrt(value).toFixed(15);
    digitsAfterOperator = result.value;
  })
};
square();

// PI
const pi = () => {
  document.querySelector(".btn-pi").addEventListener("click", () => {
    result.value = Math.PI.toFixed(15);
    digitsAfterOperator = result.value;
  })
};
pi();
