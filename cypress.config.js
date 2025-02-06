const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://juice-shop.herokuapp.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("@cypress/webpack-preprocessor")
    },
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true,
    screenshots: true,
    viewportWidth: 1280,
    viewportHeight: 720
  }
})

