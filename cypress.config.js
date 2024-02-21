const { defineConfig } = require("cypress");
const env = require('./resource.config.js');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: env.baseUrl,
    "defaultCommandTimeout": 20000,
    env: {
      "hideXhr": true,
      "cypress-plugin-skip-url-logging": true, // Permitirá ocultar as solicitações XHR durante a execução de testes no Cypress.
      "viewportWidth": 1920, viewportHeight: 1080, // tamanho da janela de visualização (viewport), que neste caso foi definido como 1920x1080 pixels. 
      "video": false, // e a opção de gravar vídeo (video), que neste caso foi desativada (false).
      "chromeWebSecurity": false,
    },
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'results/[suiteName].xml',
      toConsole: false
    },
  },
});