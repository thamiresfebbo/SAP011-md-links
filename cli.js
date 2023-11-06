const { soma, lerArquivo } = require('./index.js');
const chalk = require('chalk');

const resultado = soma(1, 3);

console.log(chalk.bgRed("A soma é: "), chalk.blue(resultado));

lerArquivo('./test/files/oneFile.md')
.then((conteudodoArquivo) => {
    console.log(chalk.bgGray (conteudodoArquivo))
});