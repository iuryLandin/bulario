const bulario = require('./src');

(async () => {
    let params = {
        filter: {
            nomeProduto: 'AMOX',
        }
    }
    const busca = await bulario.filtrarV2(params)
    console.log(`\n INFORMAÇÕES DA PESQUISA`, JSON.stringify(busca, null, 2))
})();