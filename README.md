## APIs e Webservices - TP1 - Implementação API

Nome: Wager Cipriano - 993540

Pos-graduação Especialização em Engenharia de Software - PucMG - AWS - Trabalho Prático 1 - Implementação de API

## TP1

Implementação de uma API RESTFull com controle de cache por resource.

[Link da Atividade no LMS](https://pucminas.instructure.com/courses/152486/assignments/801994)

### Banco de dados:

```javascript
const resultados = {
  pessoas: [
    { id: 1, nome: "Marcelo" },
    { id: 2, nome: "João" },
    { id: 3, nome: "Maria" },
  ],
  carros: [
    { id: 1, modelo: "Fusca" },
    { id: 2, modelo: "Gol" },
    { id: 3, modelo: "Palio" },
  ],
  animais: [
    { id: 1, nome: "Cachorro" },
    { id: 2, nome: "Gato" },
    { id: 3, nome: "Papagaio" },
  ],
};
```

</br>

### Endpoints GET (All) ✅

- https://localhost/pessoas
- https://localhost/carros
- https://localhost/animais

</br>

### Endpoints GET (item) ✅

- https://localhost/pessoas/1
- https://localhost/carros/2
- https://localhost/animais/3

<br/>

### Cache control ✅

Sistema de cache que, se o valor mudar devolvo status **200** e o novo array, se o array for igual da ultima chamada, devolver **304**

  <blockquote style="color:darkgreen">

**Como simular**:

  <ol type="a">
  <li>Fazer uma chamada <u>GET</u> a um resource, ex: /pessoas, sem headers ➜ <b>200</b> </li>
  <li>Copiar o valor do header <b>ETag</b> retornado nos response, ex: <i>ETag ⇢ pessoas_2</i></li>
  <li>Fazer uma nova chamada <u>GET</u> ao mesmo resource enviando o header <b>If-None-Match</b> com o valor obtido do "ETag" na chamada anterior, ex: <i>If-None-Match: pessoas_1</i> ➜ <b>304</b></li>
  <li>Fazer uma chamada <u>POST</u> ao mesmo resource passando um payload correto para inserir um novo registro, ex resource pessoas:<i>{"nome": "Albert Einstein"}</i>  ➜ <b>201</b></li>
  <li>Repetir a chamada <u>GET</u> do passo <i>c</i> ➜ <b>200</b> </li>
  </ol>
  </blockquote>

</br>

## Ferramentas/arquitetura:

- Node + Restify
- Github
- render.com

## REFS:

- http://restify.com/docs/home/
- https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis#7useconditionalrequests
- https://github.com/FaztWeb/restify-crud/blob/master/src/app.js

## Backlog

- [Include Database](https://www.mongodb.com/nodejs-database).
- JWT-Based, Stateless Authentication
- [ESLint Config](https://eslint.org/docs/latest/use/getting-started)

## How to configure Local Deploy

1. Clone project
2. Open project folder
3. nvm use v20.8.0
4. npm install
5. node index.js;
