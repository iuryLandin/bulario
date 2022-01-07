const bulario = require('./src');

(async () => {

    const busca = await bulario.pesquisar('dipirona')
    console.log(`\n INFORMAÇÕES DA PESQUISA`, busca)
})();