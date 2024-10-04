// Função para gerar a sequência de Fibonacci até um valor máximo
function generateFibonacci(max) {
  const fib = [1, 2];
  while (true) {
    const next = fib[fib.length - 1] + fib[fib.length - 2];
    if (next > max) break;
    fib.push(next);
  }
  return fib;
}

// Função para codificar um número usando a codificação Fibonacci/Zeckendorf
function encodeFibonacci(num) {
  const fib = generateFibonacci(num);
  let result = "";
  let sum = 0;

  // Inicia o loop da sequência de Fibonnaci de trás para frente e soma o valor a sum se não ultrapassar o número
  for (let i = fib.length - 1; i >= 0; i--) {
    if (sum + fib[i] <= num) {
      result = "1" + result;
      sum += fib[i];
    } else {
      result = "0" + result;
    }
  }

  return result + "1"; // Adiciona o stop bit
}

// Função para decodificar um código Fibonacci/Zeckendorf
function decodeFibonacci(code) {
  const fib = generateFibonacci(1000); // Gera uma sequência grande o suficiente
  let sum = 0;

  // Se o bit está ligado, soma o valor correspondente ao índice da sequência de Fibonacci
  // Ignora o último '1' que é o stop bit
  for (let i = 0; i < code.length - 1; i++) {
    if (code[i] === "1") {
      sum += fib[i];
    }
  }

  return sum;
}

// Função para codificar uma string de texto
export function encodeText(text) {
  return text
    .split("")
    .map((char) => {
      const charCode = char.charCodeAt(0); // Obtém o valor ASCII do caractere

      const encoded = encodeFibonacci(charCode);
      return encoded;
    })
    .join("");
}

// Função para decodificar uma string de texto
export function decodeText(encodedText) {
  let decodedText = "";
  let currentCode = "";

  // Itera sobre a string codificada e, sempre que encontra um stop bit, decodifica usando Fibonnaci
  for (let i = 0; i < encodedText.length; i++) {
    const isCurrentStopBit =
      currentCode.length > 0 &&
      encodedText[i] === "1" &&
      encodedText[i - 1] === "1";

    currentCode += encodedText[i];

    if (isCurrentStopBit) {
      const charCode = decodeFibonacci(currentCode);
      const char = String.fromCharCode(charCode);
      decodedText += char;
      currentCode = ""; // Reseta o código atual
    }
  }

  return decodedText;
}
