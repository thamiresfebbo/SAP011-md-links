
const fs = require("fs"); //importa o módulo (File System) e faz a leitura dos arquivos.

function mdLinks(caminhoDoArquivo) {
  return new Promise(function (resolve, reject) {
    fs.readFile(caminhoDoArquivo, "utf8", (err, data) => {
      if (err) { 
        console.log(err);
        reject(new Error('Erro ao ler o arquivo'));
        return;
      }
      
      const regex = /\[([^\]]+)\]\((https?:\/\/[^\s/$.?#].[^\s]*)\)/g;
      const matches = [...data.matchAll(regex)];//...=títulos que estão entre colchetes.
      
      const links = matches.map(match => match[2]);
      const titulos = matches.map(match => match[1]);

      if (links) {
       
        const linksInfo = links.map((link, index) => ({
          text: titulos[index].slice(0, -1),
          href: link,
          file: caminhoDoArquivo,
          broken: false
        }));
        resolve(linksInfo);
       
      } else {
        resolve([]);
      }
    });
  });
}

function validarLinks(links) {
  
  function requisicao(link) {
    return new Promise((resolve, reject) => {
      const resultado = {
        href: link.href,
        text: link.text,
        file: link.file,
      };

      fetch(link.href)//fazer requisições HTTP aos URLs dos links e validar se eles estão funcionando corretamente.
        .then((response) => {
          resultado.status = response.status;
          resultado.ok = response.ok ? 'ok' : 'fail';
          resultado.broken = !response.ok;
          resolve(resultado);
        })
        .catch((error) => {
          resultado.status = null;
          resultado.ok = 'fail';
          resultado.broken = true;
          reject(resultado);
        });
    });
  }
  
  const promessas = links.map(requisicao);

  return Promise.all(promessas);
}
module.exports = { mdLinks, validarLinks };