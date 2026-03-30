# Sobre o Projeto

Neste projeto foi desenvolvida uma loja de itens medievais, no formato de uma _API_, utilizando _TypeScript_.

O projeto foi desenvolvido utilizando as camadas _Models_, _Services_ e _Controllers_(_MSC_).

Foram criados alguns _endpoints_ que irão ler e escrever em um banco de dados, utilizando o **MySQL**.

Para o cadastro de usuários foi utilizado o _JWT(JSON Web Token)_ para gerar um _token_ de autenticação e autorização.

# Rodando o Projeto

### Requisitos:
- Node.js 16
- Docker
- Docker Compose

Depois de clonar o repositório instale as dependências do npm com o comando:
```
npm install --prefix backend
```
Inicie o docker utilizando o comando:
```
npm run docker:up
```
Crie o banco de dados com o comando:
```
npm run backend:restore --prefix backend
```
E por fim, inicie o servidor back-end com o comando:
```
npm run backend:dev
```
