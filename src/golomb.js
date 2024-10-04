const DIVISOR = 8; // Valor de m para a codificação Golomb
const BINARY_LENGTH = Math.ceil(Math.log2(DIVISOR));

function encodeGolomb(num, m) {
  const q = Math.floor(num / m); // Quociente
  const r = num % m; // Resto

  // Codificação do quociente em código unário
  const unaryCode = "0".repeat(q);

  // Codificação do resto em binário
  const binaryCode = r.toString(2).padStart(BINARY_LENGTH, "0");

  return unaryCode + "1" + binaryCode; // Adiciona o '1' que é o stop bit
}

function decodeGolomb(code, m) {
  let q = 0; // Quociente
  let i = 0;

  // Decodificação do quociente em código unário
  while (code[i] === "0") {
    q++;
    i++;
  }
  i++; // Pular o '1' que separa o código unário do binário (stop bit)

  // Decodificação do resto em binário
  const binaryCode = code.slice(i, i + BINARY_LENGTH);
  const r = parseInt(binaryCode, 2); // resto

  const d = q * m + r; // dividendo

  return d;
}

// Função para codificar uma string de texto
export function encodeText(text) {
  return text
    .split("")
    .map((char) => {
      const charCode = char.charCodeAt(0); // Obtém o valor ASCII do caractere
      const encoded = encodeGolomb(charCode, DIVISOR);
      return encoded;
    })
    .join(""); // Concatena todos os códigos sem espaços
}

export function decodeText(encodedText) {
  let decodedText = "";
  let currentCode = "";
  let i = 0;

  while (i < encodedText.length) {
    const isStopBit = encodedText[i] === "1";

    // Se encontrar o stop bit, decodifica o código atual (codigo unário da esquerda + stop bit + binário da direita) e adiciona o caractere correspondente ao texto decodificado.
    if (isStopBit) {
      currentCode =
        currentCode + "1" + encodedText.slice(i + 1, i + BINARY_LENGTH + 1);
      const charCode = decodeGolomb(currentCode, DIVISOR);
      const char = String.fromCharCode(charCode);
      decodedText += char;
      currentCode = "";
      i += BINARY_LENGTH + 1; // Pula o stop bit e o código binário
    } else {
      currentCode += encodedText[i];
      i++;
    }
  }

  return decodedText;
}
