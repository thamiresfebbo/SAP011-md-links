#!/usr/bin/env	node
console.log('Oi,	CLI!');

const { soma, lerArquivo } = require('./index.js');
const chalk = require('chalk');

const resultado = soma(1, 3);

console.log(chalk.bgRed("A soma é: "), chalk.blue(resultado));

const caminhodoArquivo = process.argv[2]; 
lerArquivo(caminhodoArquivo)
.then((conteudodoArquivo) => {
    console.log(chalk.bgGray (conteudodoArquivo))
});
 const inputs = process.argv
 console.log(inputs);
