const bulario = require('./index');

(async() => {

    const busca = await bulario.buscar('dipirona')
    console.log(`\n INFORMAÇÕES DA PESQUISA`, busca)
})();