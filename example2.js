const bulario = require('./src');

(async () => {
    const busca = await bulario.buscaFull('dipirona')
    console.log(`\n Resultado: `, JSON.stringify(busca, null, 2))
})();