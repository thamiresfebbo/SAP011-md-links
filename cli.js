#!/usr/bin/env node

const fs = require('fs'); //importa o módulo (File System) e faz a leitura dos arquivos.
const { mdLinks, validarLinks } = require('./index.js');
const caminhoDoArquivo = process.argv[2];//Lê o caminho do arquivo do primeiro argumento da linha de comando
const validacao = process.argv.includes('--validate');
const chalk = require('chalk');

if (validacao) {
    mdLinks(caminhoDoArquivo)
        .then(links => validarLinks(links))
        .then(resultados => {
            if (resultados.length === 0) {
                console.log(chalk.bgRed.black('Link não encontrado'));
                return;
            }
            resultados.forEach(resultado => {
                const urlColor = resultado.ok === 'ok' ? chalk.green : chalk.red;

                console.log('🔍 '+chalk.white(`Title: ${resultado.text}`));
                console.log(urlColor(`URL: ${resultado.href}`));
                console.log(chalk.gray(`File: ${resultado.file}`));
                if (resultado.ok === 'ok') {
                    console.log(chalk.blue(`Status: ${chalk.green('ok')} ${resultado.status}`));
                } else {
                    console.log(chalk.blue(`Status: ${chalk.red('fail')} ${resultado.status}`));
                }
                console.log();
            });
        })
        .catch(error => {
            console.error(error);
        });
} else {
    mdLinks(caminhoDoArquivo)
        .then(links => {
            if (links.length === 0) {
                console.log(chalk.bgRed.black('Link não encontrado'));
                return;
            }
            links.forEach(link => {
                console.log('🔍 '+chalk.white(`Title: ${link.text}`));
                console.log(chalk.blue(`URL: ${link.href}`));
                console.log(chalk.gray(`File: ${link.file}`));
                console.log();
            });
        })
        .catch(error => {
            console.error(error);
        });
}
