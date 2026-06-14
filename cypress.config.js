const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
    },

    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports', 
      overwrite: false,
      html: true,                   
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    }
  },

  viewportHeight: 880,
  viewportWidth: 1280,
  video: true,
  videoCompression: false
});
