/// <reference types="cypress" />

import "./commands"

// Prevent uncaught exceptions from failing tests
Cypress.on("uncaught:exception", () => {
  return false
})

