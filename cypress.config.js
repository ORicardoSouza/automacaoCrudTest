const { defineConfig } = require("cypress");
const env = require('./resource.config.js');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Adicione eventos personalizados aqui, se necessário
    },
    baseUrl: env.baseUrl,
    defaultCommandTimeout: 20000,
    env: {
      hideXhr: true,
      "cypress-plugin-skip-url-logging": true,
      viewportWidth: 1920,
      viewportHeight: 1080,
      video: false,
      chromeWebSecurity: false,
    },
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'results/[suiteName].xml',
      toConsole: false,
    },
  },
});