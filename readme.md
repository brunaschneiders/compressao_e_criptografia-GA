# Projeto de Codificação e Decodificação

## Objetivo

O objetivo deste projeto é implementar algoritmos de codificação e decodificação utilizando os métodos Golomb, Elias-Gamma, Fibonacci/Zeckendorf e Huffman. A interface de linha de comando (CLI) permite ao usuário inserir um ou mais símbolos ou codewords (binários), escolher o método de codificação ou decodificação desejado e visualizar o resultado na tela.

## Tecnologias Utilizadas

- Node.js: Plataforma de desenvolvimento para executar o JavaScript no servidor.
- Visual Studio Code (VSCode): Editor de código-fonte utilizado para desenvolver o projeto.

## Codificadores e Decodificadores Presentes

- Golomb: Codificação e decodificação utilizando o método Golomb.
- Elias-Gamma: Codificação e decodificação utilizando o método Elias-Gamma.
- Fibonacci/Zeckendorf: Codificação e decodificação utilizando o método Fibonacci/Zeckendorf.
- Huffman: Codificação e decodificação utilizando o método Huffman.

## Como Rodar

### Pré-requisitos

- Node.js: Certifique-se de que o Node.js está instalado em sua máquina. Você pode baixá-lo e instalá-lo a partir do site oficial do Node.js.

### Passo a Passo

1. Clone o repositório:

```bash
    git clone https://github.com/brunaschneiders/compressao_e_criptografia-GA.git
    cd compressao_e_criptografia-GA
```

3. Execute o projeto:

```bash
    npm start
```

5. Interaja com a CLI:
   - Insira os símbolos ou codewords (binários) quando solicitado.
   - Escolha o método de codificação (golomb, elias-gamma, fibonacci, huffman).
   - Escolha a ação (encode, decode).
   - Visualize o resultado na tela.

## Exemplo de Uso

```bash
    $ npm start
    Insira os símbolos ou codewords (binários): teste
    Escolha o método (golomb, elias-gamma, fibonacci, huffman): golomb
    Escolha a ação (encode, decode): encode
    Insira o valor de m (para Golomb): 8
    Resultado: 00000000000000110000000000000011010000000000000010110000000000000011000000000000001101

    $ npm start
    Insira os símbolos ou codewords (binários): 00000000000000110000000000000011010000000000000010110000000000000011000000000000001101
    Escolha o método (golomb, elias-gamma, fibonacci, huffman): golomb
    Escolha a ação (encode, decode): decode
    Insira o valor de m (para Golomb): 8
    Resultado: teste
```
