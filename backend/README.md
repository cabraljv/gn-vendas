# GN-VENDAS

> Essa aplicação foi desenvolvida como requisito do processo seletivo da Gerencianet
---
## Como instalar

Basta entrar no diretório do projeto e instalar os pacotes com o yarn ou npm

yarn
```sh
yarn
```

npm
```sh
npm -i
```

Altere o arquivo **.env** para adicionar as credenciais do banco de dados mysql

Se for necessário altere as outras coisas
<br>
Rode as migrations no banco de dados:

```sh
yarn sequelize-cli db:migrate 
```
ou
```sh
npm run sequelize-cli db:migrate 
```

Inicie o banco com as seeds:

```sh
yarn sequelize-cli db:seed:all 
```
ou
```sh
npm run sequelize-cli db:seed:all 
```

## Como iniciar

Para iniciar o projeto basta rodar o comando

```sh
yarn dev 
```
ou
```sh
npm run dev
```
