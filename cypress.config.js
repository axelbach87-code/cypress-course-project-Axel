const { defineConfig } = require('cypress');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');

module.exports = defineConfig({
  projectId: 'iwz9gc',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{feature,cy.js,cy.jsx,cy.ts,cy.tsx}',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);

      const environment = config.env.ENV || 'DEV';
      const urls = {
        DEV: { baseUrl: 'https://demoqa.com', apiUrl: 'https://reqres.in/api' },
        TST: { baseUrl: 'https://demoqa.com', apiUrl: 'https://reqres.in/api' }
      };

      config.baseUrl = urls[environment].baseUrl;

      // expose API_URL and API_KEY to Cypress.env (leer API_KEY desde variables de entorno del sistema si existe)
      config.env = config.env || {};
      config.env.API_URL = config.env.API_URL || urls[environment].apiUrl;
      config.env.API_KEY = config.env.API_KEY || process.env.API_KEY || '';

      return config;
    },
  },

  viewportWidth: 1280,
  viewportHeight: 800,
  defaultCommandTimeout: 10000,
});