const fetch = require('node-fetch');
const https = require('https');
const utils = require('./utils');


function headers() {
    return {
        "accept": "application/json, text/plain, */*",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "authorization": "Guest",
        "cache-control": "no-cache",
        "if-modified-since": "Mon, 26 Jul 1997 05:00:00 GMT",
        "pragma": "no-cache",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; _pk_id.42.210e=8eca716434ce3237.1690380888.; FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; _cfuvid=L.SzxLLxZoWYrYqhaiRgS5MTkV77mwE5uIyLNWvyufk-1690462598410-0-604800000; _pk_ref.42.210e=%5B%22%22%2C%22%22%2C1690462669%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_ses.42.210e=1; cf_clearance=tk5QcLSYPlUQfr8s2bTGXyvC2KZdHcEIYU8r6HCgNvQ-1690462689-0-160.0.0",
        "Referer": "https://consultas.anvisa.gov.br/",
        "UserAgent": utils.randomUseragent(),
        "Referrer-Policy": "no-referrer-when-downgrade"
    }
}

/**
 * @deprecated Use  getBula(param) instead
 */
function getBulaPaciente(idBulaPacienteProtegido) {
    console.warn("Depreciado! Utilize a funcão getBula(param)\n")
    return `https://consultas.anvisa.gov.br/api/consulta/medicamentos/arquivo/bula/parecer/${idBulaPacienteProtegido}/?Authorization=`
}

/**
 * @deprecated Use  getBula(param) instead
 */
function getBulaProfissional(idBulaProfissionalProtegido) {
    console.warn("Depreciado! Utilize a funcão getBula(param)\n")
    return `https://consultas.anvisa.gov.br/api/consulta/medicamentos/arquivo/bula/parecer/${idBulaProfissionalProtegido}/?Authorization=`
}

function getBula(idBulaP_Protegido) {
    return `https://consultas.anvisa.gov.br/api/consulta/medicamentos/arquivo/bula/parecer/${idBulaP_Protegido}/?Authorization=`
}


async function getPdf(idBulaP_Protegido) {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/medicamentos/arquivo/bula/parecer/${idBulaP_Protegido}/?Authorization=`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: headers()
    });

    const bula = await response.buffer();
    return bula;
}

async function getCategoria() {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/tipoCategoriaRegulatoria`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: headers()
    });
    const categories = await response.json();
    return categories;
}


async function getMedicamentosPorCategoria(idCategoria, pagina = 1) {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/bulario?count=10&filter%5BcategoriasRegulatorias%5D=${idCategoria}&page=${pagina}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: headers()
    });
    const medicines = await response.json();
    return medicines;
}

async function pesquisar(nomeProduto, pagina = 1) {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/bulario?count=10&filter%5BnomeProduto%5D=${nomeProduto}&page=${pagina}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: headers()
    });
    const medicines = await response.json();
    return medicines;
}

async function filtrar(filtro, pagina = 1) {
    let filter = Object.entries(filtro).map(([key, val]) => `filter[${key}]=${val}`).join('&')
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/bulario?count=10&${filter}&page=${pagina}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: headers()
    });
    const medicines = await response.json();
    return medicines;
}

async function getMedicamento(numProcesso) {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/medicamento/produtos/${numProcesso}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: headers(),
    });
    const medicine = await response.json();
    return medicine;
}


async function getAutoComplete(texto) {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/produto/listaMedicamentoBula/${texto}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: headers()
    });
    const medicine = await response.json();
    return medicine;
}

async function filtrarV2(params) {
    let defaults = {
        count: 10,
        page: 1,
        filter: {
            situacaoRegistro: 'V'
        },
    }
    const merged = utils.MergeRecursive(defaults, params)
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/medicamento/produtos/?${utils.serialize(merged)}`, {
        method: "GET",
        agent: new https.Agent({ rejectUnauthorized: false }),
        headers: headers()
    });
    const medicines = await response.json();
    return medicines;
}

async function buscaFull(nomeProduto, pagina = 1, count = 4) {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/bulario?count=${count}&filter%5BnomeProduto%5D=${nomeProduto}&page=${pagina}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: headers()
    });
    const medicines = await response.json();
    const result = [];
    for (const med of medicines.content) {
      const details = await getMedicamento(med.numProcesso);
      const res = { ...med, ...details };
      result.push(res);
    }
    return result;
}

module.exports = {
    getBulaPaciente,
    getBulaProfissional,
    getBula,
    getPdf,
    getMedicamento,
    getMedicamentosPorCategoria,
    getCategoria,
    pesquisar,
    filtrar,
    getAutoComplete,
    filtrarV2,
    buscaFull
}