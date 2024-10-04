function encodeEliasGamma(num) {
  if (num <= 0) {
    throw new Error("Número deve ser maior que zero.");
  }

  // Encontrar o valor de N
  let N = 0;
  while (Math.pow(2, N + 1) <= num) {
    // Math.pow(base, exponent)
    N++;
  }

  const prefix = "0".repeat(N); // Prefixo com N zeros
  const remainder = num - Math.pow(2, N); // Resto
  const binaryRemainder = remainder.toString(2).padStart(N, "0"); // Sufixo em binário com N bits

  return prefix + "1" + binaryRemainder; // Concatena o prefixo + stop bit +  sufixo
}

function decodeEliasGamma(code) {
  let N = 0;
  let i = 0;

  // Encontrar o valor de N (número de zeros antes do stop bit)
  while (code[i] === "0") {
    N++;
    i++;
  }
  i++; // Pular o stop bit

  const binaryRemainder = code.slice(i, i + N); // Sufixo em binário
  const remainder = parseInt(binaryRemainder, 2); // Converter sufixo binário para número
  const num = Math.pow(2, N) + remainder; // Calcular o número original

  return num;
}

export function encodeText(text) {
  return text
    .split("")
    .map((char) => {
      const charCode = char.charCodeAt(0); // Obtém o valor ASCII do caractere
      const encoded = encodeEliasGamma(charCode);
      return encoded;
    })
    .join(""); // Concatena todos os códigos sem espaços
}

export function decodeText(encodedText) {
  let decodedText = "";
  let currentCode = "";
  let i = 0;

  while (i < encodedText.length) {
    const isCurrentStopBit = encodedText[i] === "1";

    if (isCurrentStopBit) {
      const prefixLength = currentCode.length;

      currentCode =
        currentCode + "1" + encodedText.slice(i + 1, i + 1 + prefixLength);

      const charCode = decodeEliasGamma(currentCode);
      const char = String.fromCharCode(charCode);

      decodedText += char;
      currentCode = "";

      i += prefixLength + 1; // Pular o stop bit e o código atual (1 + tamanho do prefixo/sufixo)
    } else {
      currentCode += encodedText[i];
      i++;
    }
  }

  return decodedText;
}
