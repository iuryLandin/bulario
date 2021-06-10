### Bulário Digital || Bulário Eletrônico

Essa biblioteca realiza uma pesquisa no portal da ANVISA, retornando detalhes de medicamentos.

---

**Instalação**
```sh
npm install bulario
```
---

**Funcionalidades**
- Pesquisar medicamentos (busca simples pelo nome)
- Pesquisa avançada de medicamentos (filtro pela categoria e nome)
- Obter informações do medicamento
- Obter url para baixar o PDF da bula do medicamento

Obs.: As funcionalidades são limitadas pois no momento é o que o portal da anvisa oferece


#### Exemplos:

**Pesquisa Simples**
```js
const bulario = require('bulario');
(async() => {
    const busca = await bulario.pesquisar('dipirona')
    console.log(`\n INFORMAÇÕES DA PESQUISA`, busca)
})();
```

**Detalhes do Medicamento**
```js
const bulario = require('bulario');
(async() => {
    const numProcesso = 25351679903201454;
    const medicamento = await bulario.getMedicamento(numProcesso);
    console.log(`\n INFORMAÇÕES DA PESQUISA`, medicamento);
})();
```

**Filtro**
```js
const bulario = require('bulario');
(async() => {
    let filtro = {
        categoriasRegulatorias: 5,
        nomeProduto: 'dipirona'
    }
    const busca = await bulario.filtrar(filtro)
    console.log(`\n INFORMAÇÕES DA PESQUISA`, busca)
})();
```

**Listar Categorias**
```js
const bulario = require('bulario');
(async() => {
    const categorias = await bulario.getCategoria()
    console.log(`\n INFORMAÇÕES DA PESQUISA`, categorias)
})();
```

**Listar Medicamentos por Categoria**
```js
const bulario = require('bulario');
(async() => {
    const idCategoria = 5;
    const busca = await bulario.getMedicamentosPorCategoria(idCategoria)
    console.log(`\n INFORMAÇÕES DA PESQUISA`, busca)
})();
```

**Retornar link para arquivo PDF da bula**
```js
const bulario = require('bulario');
(async() => {
    const idBulaPacienteProtegido = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
    const idBulaProfissionalProtegido = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

    const bula_paciente = await bulario.getBulaPaciente(idBulaPacienteProtegido)
    const bula_profissional = await bulario.getBulaPaciente(idBulaProfissionalProtegido)
    
    console.log(`\n URL bula do paciente`, bula_paciente)
    console.log(`\n URL bula do do Profissional`, bula_profissional)
})();
```

#### Contato
Você tem dúvidas ou sugestões? fale comigo através das redes sociais ou deixe um issue.

----

[![Telegram Badge](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/iurylandin) 

[![Instagram Badge](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/iury.landin/) 

[![Instagram Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/iury-landin-b94b74133/)