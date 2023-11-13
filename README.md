## APIs e Webservices - TP1 - Implementação API

Nome: Wager Cipriano - 993540

Pos-graduação Especialização em Engenharia de Software - PucMG - AWS - Trabalho Prático 1 - Implementação de API

## Hospegagem

> [!NOTE]  
> Esta api está hospedada no [render](https://render.com/) em uma <b>instancia gratuita</b>.

> [!IMPORTANT]  
> Instâncias gratuitas entram em estado de hibernação quando ficam inativas, se receber requisições por mais de 15min.
> SE OPTAR por utilizar a versão hospedada tenha **conciência deste fato** !

> [!WARNING]  
> Com isso, uma primeira requisição pode **demorar até 5min** para que a instancia volte para o estado ativo novamente.
> Mas depois, para as próximas requisições passa a responder normalmente.

$\color{gray}{Segue\ o\ endereço\ para\ acesso\ à\ API:}$
[https://pos-es-api-tp1.onrender.com/api/](https://pos-es-api-tp1.onrender.com/api/)

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

https://pos-es-api-tp1.onrender.com/api/ping

https://pos-es-api-tp1.onrender.com/api/ping

### Resources Endpoints GET (All) ✅

- https://pos-es-api-tp1.onrender.com/api/pessoas
- https://pos-es-api-tp1.onrender.com/api/carros
- https://pos-es-api-tp1.onrender.com/api/animais

</br>

### Resources Endpoints GET (item) ✅

- https://pos-es-api-tp1.onrender.com/api/pessoas/1
- https://pos-es-api-tp1.onrender.com/api/carros/2
- https://pos-es-api-tp1.onrender.com/api/animais/3

### RESTFull API

Allowed Methods: GET, POST, PATH, DELETE

<br/>

### Cache control ✅

Sistema de cache que, se o valor mudar devolvo status **200** e o novo array, se o array for igual da ultima chamada, devolver **304**

  <blockquote style="color:darkgreen">

**Como simular**:

  <ol type="a">
  <li>Fazer uma chamada <u>GET</u> a um resource, ex: /pessoas, sem headers ➜ <b>200</b> </li>
  <li>Copiar o valor do header <b>ETag2</b> retornado nos response, ex: <i>ETag2 ⇢ pessoas_2023-11-07_1</i></li>
  <li>Fazer uma nova chamada <u>GET</u> ao mesmo resource enviando o header <b>If-None-Match</b> com o mesmo valor obtido do "ETag2" na chamada anterior, ex: <i>If-None-Match: pessoas_2023-11-07_1</i> ➜ <b>304</b></li>
  <li>Fazer uma chamada <u>POST</u> ao mesmo resource passando um payload correto para inserir um novo registro, ex resource pessoas:<i>{"nome": "Albert Einstein"}</i>  ➜ <b>201</b></li>
  <li>Repetir a chamada <u>GET</u> do passo <i>c</i> com os mesmos parâmetros e headers ➜ <b>200</b> </li>
  </ol>
  </blockquote>

  OBS: Está sendo utilizado o header chamado "ETag2" porque o o header "ETag" padrão está sendo sobrescrito pelo default da CDN (cloudflare) quando utilizamos a versão hospedada no render.com conforme [referência](https://community.render.com/t/are-etags-overwritten-by-renders-default-cdn/6899). Porém, na versão local funciona normalmente.

</br>

## Ferramentas/arquitetura:

- Node + Restify
- Github
- render.com

## Backlog

- [Include Database](https://www.mongodb.com/nodejs-database).
- JWT-Based, Stateless Authentication
- [ESLint Config](https://eslint.org/docs/latest/use/getting-started)

## How to configure Local Deploy

1. Clone project:
   `git clone https://github.com/wcipriano/pos-es-api-tp1.git`
2. Open project folder:
   `cd pos-es-api-tp1/`
3. Create .env file and put key: `PORT=4334`
4. Install node, npm and nvm (if necessary): [link](https://medium.com/@iam_vinojan/how-to-install-node-js-and-npm-using-node-version-manager-nvm-143165b16ce1)
5. Set npm version: `nvm use v20.8.0`. See the versions below:

   ```json
   "npm": ">=9.6.2 <=10.2.0",
   "node": ">=14.17.0 <=20.8.0"
   ```

6. Install packages: `npm install`
7. Run the application: `npm start`

## Projeto

Utilize [este link](./Insomnia_2023-10-12.json) Segue abaixo o link para o arquivo JSON do projeto para subir em uma ferramenta de testes (insomnia, Postman, etc)

## REFS:

- http://restify.com/docs/home/
- https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis#7useconditionalrequests
- https://github.com/FaztWeb/restify-crud/blob/master/src/app.js
- https://restfulapi.net/http-methods/
