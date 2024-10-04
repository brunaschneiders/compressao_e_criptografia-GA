// Função para calcular a frequência de cada símbolo
function calculateFrequency(text) {
  const frequency = {};
  for (const char of text) {
    if (frequency[char]) {
      frequency[char]++;
    } else {
      frequency[char] = 1;
    }
  }
  return frequency;
}

// Função para ordenar as frequências dos símbolos
function sortFrequency(frequency) {
  return Object.entries(frequency).sort((a, b) => b[1] - a[1]);
}

// Classe Node para representar os nós da árvore de Huffman
class Node {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

// Função para construir a árvore de Huffman
function buildHuffmanTree(orderedFrequency) {
  // Cria uma lista de nós a partir das frequências ordenadas dos símbolos
  const heap = orderedFrequency.map(([char, freq]) => new Node(char, freq));
  console.log({ heap });

  // Continua combinando os nós até que reste apenas um nó
  while (heap.length > 1) {
    // Remove os dois nós de menor frequência (últimos elementos da lista)
    const left = heap.pop();
    const right = heap.pop();

    // Cria um novo nó com a soma das frequências dos dois nós removidos
    const merged = new Node(null, left.freq + right.freq);
    merged.left = left;
    merged.right = right;

    console.log({ left, right, merged });

    // Adiciona o novo nó de volta à lista
    heap.push(merged);

    // Reordena a lista de nós pela frequência em ordem decrescente
    heap.sort((a, b) => b.freq - a.freq);
  }

  // Retorna o nó restante, que é a raiz da árvore de Huffman
  return heap[0];
}

// Função para associar códigos aos símbolos
function assignCodes(node, code = "", codes = {}) {
  if (node) {
    if (node.char !== null) {
      codes[node.char] = code;
    }
    assignCodes(node.left, code + "0", codes);
    assignCodes(node.right, code + "1", codes);
  }
  return codes;
}

// Função para codificar o texto usando Huffman
export function encodeText(text) {
  const sortedFrequency = sortFrequency(calculateFrequency(text));
  console.log({ sortedFrequency });
  const huffmanTree = buildHuffmanTree(sortedFrequency);
  console.log({ huffmanTree });
  const huffmanCodes = assignCodes(huffmanTree);
  const encodedText = text
    .split("")
    .map((char) => huffmanCodes[char])
    .join("");
  return { encodedText, huffmanCodes };
}

// Função para decodificar o texto codificado usando Huffman
export function decodeText(encodedText, huffmanCodes) {
  const reverseCodes = Object.fromEntries(
    Object.entries(huffmanCodes).map(([k, v]) => [v, k])
  );
  let currentCode = "";
  let decodedText = "";

  for (const bit of encodedText) {
    currentCode += bit;
    if (reverseCodes[currentCode]) {
      decodedText += reverseCodes[currentCode];
      currentCode = "";
    }
  }

  return decodedText;
}
