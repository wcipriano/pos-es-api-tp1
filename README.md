# APIs e Webservices - TP1 - Implementação API

Nome: Wager Cipriano - 993540
pos-es-api-tp1
Pos-graduação Especialização em Engenharia de Software - PucMG - AWS - Trabalho Prático 1 - Implementação de API

## TP1

Dado o seguinte objeto que se segue:

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

1. Fazer um servidor web que devolva os dados acima, de acordo com a url acessada
   https://localhost/pessoas
   https://localhost/carros
   https://localhost/animais

2. Fazer um sistema de cache que, se o valor mudar devolvo status 200 e o novo array, se o array for igual da ultima chamada, devolver 304

3. Ponto extra (devolver apenas um item)
   https://localhost/pessoas/1
   https://localhost/carros/2
   https://localhost/animais/3

4. Orientação de Entrega:
   Enviar um link do GitHub ou GitLab com o código (programa), incluindo um arquivo README.md com os dados dos integrantes do grupo (nome completo e matricula)

## Implementação API com Cache server

Link da Atividade no LMS
https://pucminas.instructure.com/courses/152486/assignments/801994

## Ferramentas/arquitetura:

render.com, Node + Restify

## REFS:

http://restify.com/docs/home/
https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis#7useconditionalrequests
https://github.com/FaztWeb/restify-crud/blob/master/src/app.js

## JS -> Node -> Deno -> Bun

https://snyk.io/blog/javascript-runtime-compare-node-deno-bun/

## Furure

- Include Database:
  https://www.mongodb.com/nodejs-database

- JWT-Based, Stateless Authentication

-- ESLint
https://eslint.org/docs/latest/use/getting-started

## How to configure Local Deploy

1. Clone project
2. Open project folder
3. nvm use v20.8.0
4. npm install
5. node index.js;
