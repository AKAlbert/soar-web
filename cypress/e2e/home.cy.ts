import HomePage from "../pages/home-page"
import LoginPage from "../pages/login-page"

describe("OWASP Juice Shop Home Page", () => {
  beforeEach(() => {
    HomePage.visit()
  })

  it("should display all products when maximum items per page is selected", () => {
    HomePage.scrollToBottom()
    HomePage.changeItemsPerPage()
    HomePage.verifyAllProductsDisplayed(37) 
  })


  it("should display product details and handle reviews", () => {
    // Click on the first product (Apple Juice)
    HomePage.clickFirstProduct()

    // Verify product dialog and image
    HomePage.verifyProductDialog()

    // Expand reviews section
    HomePage.expandReviews()
    cy.wait(2000)

    // Close the product dialog
    HomePage.closeProductDialog()
  })

  it("should handle registration and login process", () => {
    // Navigate to registration page
    HomePage.navigateToRegistration()

    // Test form validation
    HomePage.checkFormValidation()

    // Fill registration form
    HomePage.fillRegistrationForm()

    // Submit registration
    HomePage.submitRegistration()

    // Login with generated credentials
    HomePage.login()
  })

  it("should handle shopping cart and checkout process", () => {
    // Login first
    HomePage.navigateToRegistration()
    HomePage.fillRegistrationForm()

    // Submit registration
    HomePage.submitRegistration()
    HomePage.openLoginPage()
    HomePage.login()

    // Add 5 different products to basket
    for (let i = 0; i < 6; i++) {
      HomePage.addProductToBasket(i)
    }

    // Go to basket
    HomePage.goToBasket()
    
    // Store initial total price
    cy.get(HomePage.totalPrice).invoke('text').as('initialTotal')
    
    // Verify total price changed
    cy.get('@initialTotal').then((initialTotal) => {
      cy.get(HomePage.totalPrice).should('not.contain', initialTotal)
    })

    HomePage.addItemsToBasket()

    // Add address
    HomePage.addNewAddress()
    HomePage.fillAddressForm()

    // Select delivery method
    HomePage.selectDeliveryMethod()

    // Add credit card
    HomePage.addCreditCard()
    HomePage.placeOrder()

  })
})
