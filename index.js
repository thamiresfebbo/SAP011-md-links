
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
          text: titulos[index].slice(),
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
    return fetch(link.href)
      .then((response) => ({
        href: link.href,
        text: link.text,
        file: link.file,
        status: response.status,
        ok: response.ok ? 'ok' : 'fail',
        broken: !response.ok,
      }))
      .catch((error) => ({
        href: link.href,
        text: link.text,
        file: link.file,
        status: null,
        ok: 'fail',
        broken: true,
      }));
  }
  
  const promessas = links.map(requisicao);

  return Promise.all(promessas);
}
module.exports = { mdLinks, validarLinks };