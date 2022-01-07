const fetch = require('node-fetch');

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
        headers: {
            "accept": "application/json, text/plain, */*",
            "authorization": "Guest",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "cookie": "_TRAEFIK_BACKEND=http://10.0.2.51:8080; FGTServer=2DE20D8040A1176F71792EB219E8DA9BCEDF996805D330F1AFAB13D5103423AE685570373EACB70B61CDD992CE85"
        },
    });

    const bula = await response.buffer();
    return bula;
}

async function getCategoria() {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/tipoCategoriaRegulatoria`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: {
            "accept": "application/json, text/plain, */*",
            "authorization": "Guest",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "cookie": "_TRAEFIK_BACKEND=http://10.0.2.51:8080; FGTServer=2DE20D8040A1176F71792EB219E8DA9BCEDF996805D330F1AFAB13D5103423AE685570373EACB70B61CDD992CE85"
        },
    });
    const categories = await response.json();
    return categories;
}


async function getMedicamentosPorCategoria(idCategoria, pagina = 1) {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/bulario?count=10&filter%5BcategoriasRegulatorias%5D=${idCategoria}&page=${pagina}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: {
            "accept": "application/json, text/plain, */*",
            "authorization": "Guest",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "cookie": "_TRAEFIK_BACKEND=http://10.0.2.51:8080; FGTServer=2DE20D8040A1176F71792EB219E8DA9BCEDF996805D330F1AFAB13D5103423AE685570373EACB70B61CDD992CE85"
        },
    });
    const medicines = await response.json();
    return medicines;
}

async function pesquisar(nomeProduto, pagina = 1) {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/bulario?count=10&filter%5BnomeProduto%5D=${nomeProduto}&page=${pagina}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: {
            "accept": "application/json, text/plain, */*",
            "authorization": "Guest",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "cookie": "_TRAEFIK_BACKEND=http://10.0.2.51:8080; FGTServer=2DE20D8040A1176F71792EB219E8DA9BCEDF996805D330F1AFAB13D5103423AE685570373EACB70B61CDD992CE85"
        },
    });
    const medicines = await response.json();
    return medicines;
}

async function filtrar(filtro, pagina = 1) {
    let filter = Object.entries(filtro).map(([key, val]) => `filter[${key}]=${val}`).join('&')
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/bulario?count=10&${filter}&page=${pagina}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: {
            "accept": "application/json, text/plain, */*",
            "authorization": "Guest",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "cookie": "_TRAEFIK_BACKEND=http://10.0.2.51:8080; FGTServer=2DE20D8040A1176F71792EB219E8DA9BCEDF996805D330F1AFAB13D5103423AE685570373EACB70B61CDD992CE85"
        },
    });
    const medicines = await response.json();
    return medicines;
}

async function getMedicamento(numProcesso) {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/medicamento/produtos/${numProcesso}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: {
            "accept": "application/json, text/plain, */*",
            "authorization": "Guest",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "cookie": "_TRAEFIK_BACKEND=http://10.0.2.51:8080; FGTServer=2DE20D8040A1176F71792EB219E8DA9BCEDF996805D330F1AFAB13D5103423AE685570373EACB70B61CDD992CE85"
        },
    });
    const medicine = await response.json();
    return medicine;
}


async function getAutoComplete(texto) {
    const response = await fetch(`https://consultas.anvisa.gov.br/api/produto/listaMedicamentoBula/${texto}`, {
        method: "GET",
        agent: new (require("https").Agent)({ rejectUnauthorized: false }),
        headers: {
            "accept": "application/json, text/plain, */*",
            "authorization": "Guest",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "cookie": "_TRAEFIK_BACKEND=http://10.0.2.51:8080; FGTServer=2DE20D8040A1176F71792EB219E8DA9BCEDF996805D330F1AFAB13D5103423AE685570373EACB70B61CDD992CE85"
        },
    });
    const medicine = await response.json();
    return medicine;
}


module.exports = { getBulaPaciente, getBulaProfissional, getBula, getPdf, getMedicamento, getMedicamentosPorCategoria, getCategoria, pesquisar, filtrar, getAutoComplete }