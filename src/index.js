import readline from "readline";
import * as Golomb from "./golomb.js";
import * as EliasGamma from "./elias-gamma.js";
import * as Fibonacci from "./fibonacci.js";
// import * as Huffman from "./huffman.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function validateInput(input, action) {
  if (action === "encode") {
    if (typeof input !== "string" || input.length === 0) {
      throw new Error("A entrada deve ser uma string não vazia.");
    }
  } else if (action === "decode") {
    if (!/^[01]+$/.test(input)) {
      throw new Error(
        "A entrada deve ser uma string binária (contendo apenas 0 e 1)."
      );
    }
  } else {
    throw new Error("Ação desconhecida.");
  }
}

async function main() {
  try {
    const input = await askQuestion(
      "Insira os símbolos ou codewords (binários): "
    );
    const method = await askQuestion(
      "Escolha o método (golomb, elias-gamma, fibonacci): "
    );
    const action = await askQuestion("Escolha a ação (encode, decode): ");

    validateInput(input, action);

    let result = "";

    switch (method) {
      case "golomb":
        const m = parseInt(
          await askQuestion("Insira o valor de m (para Golomb): ")
        );
        if (isNaN(m) || m <= 0) {
          throw new Error("O valor de m deve ser um número inteiro positivo.");
        }
        if (action === "encode") {
          result = Golomb.encodeText(input, m);
        } else {
          result = Golomb.decodeText(input, m);
        }
        break;
      case "elias-gamma":
        if (action === "encode") {
          result = EliasGamma.encodeText(input);
        } else {
          result = EliasGamma.decodeText(input);
        }
        break;
      case "fibonacci":
        if (action === "encode") {
          result = Fibonacci.encodeText(input);
        } else {
          result = Fibonacci.decodeText(input);
        }
        break;
      // case "huffman":
      //   if (action === "encode") {
      //     result = Huffman.encodeText(input);
      //   } else {
      //     result = Huffman.decodeText(input);
      //   }
      //   break;
      default:
        throw new Error("Método desconhecido.");
    }

    console.log(`Resultado: ${result}`);
  } catch (error) {
    console.error(`Erro: ${error.message}`);
  } finally {
    rl.close();
  }
}

main();
