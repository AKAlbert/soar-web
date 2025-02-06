/// <reference types="cypress" />

class LoginPage {
  // Elements
  private emailInput = "#email"
  private passwordInput = "#password"
  private loginButton = "#loginButton"
  private rememberMeCheckbox = "#rememberMe"

  // Actions
  login(email: string, password: string) {
    cy.get(this.emailInput).type(email)
    cy.get(this.passwordInput).type(password)
    cy.get(this.loginButton).click()
  }

  toggleRememberMe() {
    cy.get(this.rememberMeCheckbox).click()
  }

  // Assertions
  verifyLoginFormVisible() {
    cy.get(this.emailInput).should("be.visible")
    cy.get(this.passwordInput).should("be.visible")
    cy.get(this.loginButton).should("be.visible")
  }
}

export default new LoginPage()

