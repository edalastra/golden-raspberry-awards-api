# Golden Raspberry Awards API

Uma API RESTful desenvolvida em **Node.js** com **TypeScript** para consultar os indicados e vencedores da categoria *Pior Filme* do Golden Raspberry Awards.

A aplicação processa automaticamente um arquivo CSV dentro `src/data` ao iniciar, popula um banco de dados em memória (SQlite).
---

## Tecnologias Utilizadas

* **Runtime:** [Node.js v20+](https://nodejs.org/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Framework:** [Express](https://expressjs.com/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Banco de Dados:** [SQLite](https://www.sqlite.org/)
* **Testes:** [Jest](https://jestjs.io/) & [Supertest](https://github.com/ladjs/supertest)
* **Linter:** [ESLint](https://eslint.org/)

---

## 🛠️ Como Rodar o Projeto

O projeto foi configurado para ser executado com o mínimo de comandos possível. **Não é necessária nenhuma instalação externa de banco de dados.**

### 1. Instalação
Clone o repositório e instale as dependências. O Prisma gerará o client automaticamente após a instalação (via `postinstall`).
```bash
npm install
```

### 2. Execução em desenvolvimento
Este comando sincroniza as migrations com sqlite, importa os dados do CSV e inicia o servidor em modo desenvolvimento.
```bash
npm run dev
```

### 3. Execução em produção
Aqui o código typescript será transcrito para javascript e executado nativamente.
```bash
npm run build
npm run start
```
---

## Testes de Integração
Para executar os testes deve-se executar o comando.
```bash
npm run test
```

---
## Endpoints da API

### A documentação dos enpoints pode ser consultada no enpoint `/api-doc`.

---

## Variáveis de ambiente

### Há um arquivo na pasta raiz chamando `.env`, nele estão algumas configurações
- DATABASE_URL: url de conexão do Sqlite
- PORT: Porta de execução do servidor
- BATCH_SIZE: Tamanho do lote de dados que serão salvos por vez
- CSV_PATH: Caminho do arquivo csv para importação de dados

## Notas de Implementação

1. Maturidade de Richardson: A API implementa os verbos http e códigos de status.
2. Streaming de Dados: A leitura do csv utiliza streams e batch para criação no banco, garantindo que arquivos csvs maiores não causem problemas de memória na aplicação.
3. Estruturação dos dados: Filmes e Produtores são persistidos em uma relação Many-to-Many, a aplicação trata automaticamente registros com mais de um produtor.

--

## Oportunidade de melhorias mapeadas

1. Criação de um sistema de cache para reduzir consultas ao banco de dados.
2. Criação de testes unitários para garantir maior cobertura e qualidade de código.