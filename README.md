![Cypress Logo](https://cloud.githubusercontent.com/assets/1268976/20607953/d7ae489c-b24a-11e6-9cc4-91c6c74c5e88.png)

Este repositório contém testes funcionais automatizados utilizando o framework Cypress. 
Os testes são projetados para verificar a funcionalidade e comportamento de uma api.

## Instalação

Antes de executar os testes, certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em sua máquina.
Siga os passos abaixo para configurar e executar os testes:

1. Clone este repositório para sua máquina local:

```bash
git clone https://github.com/ORicardoSouza/automacaoCrudTest.git
cd nome-do-repositorio
```

2. Instale as dependências do projeto usando o npm:

```bash
npm install
```

## Executando os Testes

Para executar os testes, você pode utilizar os seguintes comandos:

- Executar testes com interface gráfica:

```bash
npm run deleteResults && npm run cy:open
```

- Executar testes no modo headless (sem interface gráfica):

```bash
npm run test
```

Os testes serão executados automaticamente em segundo plano e você verá os resultados no terminal.

---

# Bibliotecas Utilizadas

Este projeto utiliza as seguintes bibliotecas:

1. **Cypress** [Versão: ^13.6.5](https://www.npmjs.com/package/cypress)
   - Descrição: Cypress é uma ferramenta de teste de front-end rápida, fácil de usar e robusta, construída para a web moderna.
   - Documentação: [Cypress Docs](https://docs.cypress.io/guides/overview/why-cypress.html)

2. **Mocha JUnit Reporter** [Versão: ^2.2.1](https://www.npmjs.com/package/mocha-junit-reporter)
   - Descrição: Um reporter de Mocha que gera arquivos de saída no formato JUnit XML.
   - Documentação: [Mocha JUnit Reporter](https://www.npmjs.com/package/mocha-junit-reporter)

3. **Moment Timezone** [Versão: ^0.5.45](https://www.npmjs.com/package/moment-timezone)
   - Descrição: Biblioteca JavaScript que analisa, valida, manipula e exibe datas e horas em JavaScript.
   - Documentação: [Moment Timezone Docs](https://momentjs.com/timezone/docs/)

4. **Node LocalStorage** [Versão: ^3.0.5](https://www.npmjs.com/package/node-localstorage)
   - Descrição: Simula a API do LocalStorage do navegador para Node.js.
   - Documentação: [Node LocalStorage](https://www.npmjs.com/package/node-localstorage)

5. **Open** [Versão: ^10.0.3](https://www.npmjs.com/package/open)
   - Descrição: Abre URLs, arquivos e aplicativos de forma cruzada de plataforma.
   - Documentação: [Open Package](https://www.npmjs.com/package/open)

6. **XmlDom** [Versão: ^0.6.0](https://www.npmjs.com/package/xmldom)
   - Descrição: Biblioteca de manipulação de XML para JavaScript.
   - Documentação: [XmlDom](https://www.npmjs.com/package/xmldom)

7. **Git Repo Name** [Versão: ^1.0.1](https://www.npmjs.com/package/git-repo-name)
   - Descrição: Obtém o nome do repositório Git de um diretório local.
   - Documentação: [Git Repo Name](https://www.npmjs.com/package/git-repo-name)

Certifique-se de revisar a documentação de cada biblioteca para obter informações detalhadas sobre como utilizá-las em seu projeto.

---

Este README fornece uma breve visão geral das bibliotecas utilizadas no projeto, juntamente com links para suas respectivas documentações para referência adicional.