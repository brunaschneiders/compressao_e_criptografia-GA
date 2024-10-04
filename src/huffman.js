const readline = require("readline");

class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

// Função para construir a árvore de Huffman
function buildHuffmanTree(text) {
  const freqMap = new Map(); // frequência dos caracteres

  for (const char of text) {
    if (!freqMap.has(char)) {
      freqMap.set(char, 0);
    }
    freqMap.set(char, freqMap.get(char) + 1);
  }

  const sortedFreq = [...freqMap.entries()].sort((a, b) => b[1] - a[1]);
  // Criar uma fila de prioridade (min-heap)
  const heap = [];
  for (const [char, freq] of sortedFreq) {
    heap.push(new HuffmanNode(char, freq));
  }
  console.log({ heap });
  heap.sort((a, b) => a.freq - b.freq);
  // Construir a árvore de Huffman
  while (heap.length > 1) {
    const left = heap.shift();
    const right = heap.shift();
    const newNode = new HuffmanNode(null, left.freq + right.freq, left, right);
    heap.push(newNode);
    heap.sort((a, b) => a.freq - b.freq);
  }
  console.log({ heap });
  return heap[0];
}
// Função para gerar os códigos de Huffman
function generateHuffmanCodes(node, prefix = "", codeMap = new Map()) {
  if (node.char !== null) {
    codeMap.set(node.char, prefix);
  } else {
    generateHuffmanCodes(node.left, prefix + "0", codeMap);
    generateHuffmanCodes(node.right, prefix + "1", codeMap);
  }
  return codeMap;
}
// Função para codificar um texto usando Huffman
function encodeHuffman(text) {
  const root = buildHuffmanTree(text);
  const codeMap = generateHuffmanCodes(root);
  let encodedText = "";
  for (const char of text) {
    encodedText += codeMap.get(char);
  }
  return { encodedText, root };
}
// Função para decodificar um texto usando Huffman
function decodeHuffman(encodedText, root) {
  let decodedText = "";
  let node = root;
  for (const bit of encodedText) {
    node = bit === "0" ? node.left : node.right;
    if (node.char !== null) {
      decodedText += node.char;
      node = root;
    }
  }
  return decodedText;
}

// function encodeHuffman(text) {
//   const freqMap = new Map();

//   // Contar a frequência de cada caractere
//   for (const char of text) {
//     freqMap.set(char, (freqMap.get(char) || 0) + 1);
//   }

//   // Ordenar o mapa de acordo com a frequência da maior ocorrência para a menor
//   const sortedFreq = [...freqMap.entries()].sort((a, b) => b[1] - a[1]);
//   console.log(freqMap, sortedFreq);
// }

// Função principal para interagir com o usuário
function main() {
  console.log(encodeHuffman("abracadabra"));
  //   const rl = readline.createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //   });

  //   rl.question("Insira um texto para codificar usando Huffman: ", (input) => {
  //     if (!input) {
  //       console.error("Entrada inválida. Por favor, insira um texto.");
  //       rl.close();
  //       return;
  //     }

  //     rl.question(
  //       "Insira o valor de m para a codificação Huffman: ",
  //       (mInput) => {
  //         const m = parseInt(mInput);
  //         if (isNaN(m) || m <= 0) {
  //           console.error(
  //             "Valor de m inválido. Por favor, insira um número positivo."
  //           );
  //           rl.close();
  //           return;
  //         }

  //         const encoded = encodeTextHuffman(input, m);
  //         console.log(`Texto codificado: ${encoded}`);

  //         const decoded = decodeTextHuffman(encoded, m);
  //         console.log(`Texto decodificado: ${decoded}`);

  //         rl.close();
  //       }
  //     );
  //   });
}

// Executa a função principal
main();
