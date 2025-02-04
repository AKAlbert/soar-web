/// <reference types="cypress" />

class HomePage {
    // Elements
    private productCards = 'mat-grid-tile'
    private searchIcon = '[data-icon="search"]'
    private accountButton = '[aria-label="Show/hide account menu"]'
    private loginButton = '#navbarLoginButton'
    private languageButton = '[data-icon="language"]'
    private itemsPerPageSelect = 'mat-select[aria-label="Items per page:"]'
    private itemsPerPageButton = '.mat-select-arrow-wrapper'
    private maxItemsOption = 'mat-option:last-child'
    private paginatorRange = '.mat-paginator-range-label'
    private itemsPerPageLabel = '.mat-paginator-page-size-label'
    private nextPageButton = '.mat-paginator-navigation-next'
  
    // Updated selectors for popups
    private welcomeBanner = 'app-welcome-banner'
    private dismissButton = 'button[aria-label="Dismiss"]'
    private cookieConsent = '.cc-window'
    private cookieAcceptButton = '.cc-btn.cc-dismiss'
  
    // New selectors for product details
    private firstProduct = 'mat-grid-tile:first-child'
    private productDialog = 'mat-dialog-container'
    private productImage = 'img.img-responsive'
    private reviewsButton = 'mat-expansion-panel[aria-label="Expand for Reviews"]'
    private closeDialogButton = 'button[aria-label="Close Dialog"]'
  
    // Updated navigation selectors
    private notYetCustomerButton = '#newCustomerLink'
  
    // Updated registration form selectors
    private emailInput = '#emailControl'
    private passwordInput = '#passwordControl'
    private repeatPasswordInput = '#repeatPasswordControl'
    private securityQuestionSelect = '[name="securityQuestion"]'
    private firstSecurityQuestion = '#mat-option-4 > .mat-option-text'
    private securityAnswerInput = '#securityAnswerControl'
    private showPasswordAdvice = 'mat-slide-toggle[aria-label="Show password advice"]'
    private registerButton = '#registerButton'
  
    // Form validation messages
    private errorMessages = 'mat-error'
  
    // Add new selectors
    private addToBasketButton = 'button[aria-label="Add to Basket"]'
    private basketCounter = 'span.fa-layers-counter'
    private basketButton = 'button[routerlink="/basket"]'
    private itemQuantity = 'mat-form-field input[type="number"]'
    private deleteItemButton = ':nth-child(6) > .cdk-column-remove > .mat-focus-indicator'
    private checkoutButton = '#checkoutButton'
    private totalPriceSelector = '#price'
    private successMessage = '.mat-simple-snack-bar-content'
    private addressButton = 'div.ng-star-inserted > .mat-focus-indicator > .mat-button-wrapper > span'
    private continueButton = '.btn-next > .mat-button-wrapper > span'
    private continueButtonDelivery = '.nextButton > .mat-button-wrapper > span'
    private deliverySpeedButton = '#mat-radio-43 > .mat-radio-label > .mat-radio-container > .mat-radio-outer-circle'
    private placeOrderButton = '#checkoutButton > .mat-button-wrapper > span'
    
  
    // Update selectors for products and basket
    private productGrid = 'mat-grid-list.mat-grid-list'
    private productTile = 'mat-grid-tile.mat-grid-tile.ng-star-inserted'
  
    // Updated selectors for basket interaction
    private yourBasketButton = '[aria-label="Show the shopping cart"]'
    private increaseQuantityButton = 'button.mat-icon-button.mat-button-base.ng-star-inserted'
  
    // Add address form selectors
    private addressForm = {
      country: '#mat-input-9',
      name: '#mat-input-10',
      mobileNumber: '#mat-input-11',
      zipCode: '#mat-input-12',
      address: '#address',
      city: '#mat-input-14',
      state: '#mat-input-15',
      submitButton: '#submitButton > .mat-button-wrapper'
    }
  
    // Updated selectors for credit card form
    private creditCardForm = {
      addNewCardDropdown: '#mat-expansion-panel-header-0 > .mat-expansion-indicator',
      name: '#mat-input-16',
      cardNumber: '#mat-input-17',
      expiryMonth: '#mat-input-18',
      expiryYear: '#mat-input-19',
      submitButton: '#submitButton',
      cardRadioButton: '.mat-radio-label'
    }
  
    // Actions
    visit() {
      cy.visit("/")
      this.handleInitialPopups()
    }
  
    private handleInitialPopups() {
      // Handle cookie consent
      cy.get(this.cookieConsent, { timeout: 10000 }).should('be.visible')
      cy.get(this.cookieAcceptButton).click()
  
      // Handle welcome banner
      cy.get('body').then($body => {
        // Try different ways to find the dismiss button
        cy.contains('button', 'Dismiss').click()
        // Verify the welcome banner is gone
        cy.get(this.welcomeBanner).should('not.exist')
      })
  
      // Final check for cookie consent to be gone
      cy.get(this.cookieConsent).should('not.be.visible')
    }
  
    getProductCards() {
      return cy.get(this.productCards)
    }
  
    searchProducts() {
      return cy.get(this.searchIcon)
    }
  
    openAccountMenu() {
      return cy.get(this.accountButton).click()
    }
  
    openLoginPage() {
      this.openAccountMenu()
      return cy.get(this.loginButton).click()
    }
  
    changeLanguage() {
      return cy.get(this.languageButton)
    }
  
    scrollToBottom() {
      // Scroll to the paginator area first
      cy.get(this.nextPageButton).scrollIntoView({ duration: 1000 })
        .should('be.visible')
        
      // Additional wait to ensure everything is loaded
      cy.wait(500)
    }
  
    navigateToLastPage() {
      // Click next until we reach the last page
      cy.get('body').then($body => {
        const clickNextUntilDisabled = () => {
          cy.get(this.nextPageButton).then($btn => {
            if (!$btn.prop('disabled')) {
              cy.wrap($btn)
                .scrollIntoView()
                .should('be.visible')
                .click()
              cy.wait(500) // Wait for page transition
              clickNextUntilDisabled()
            }
          })
        }
        clickNextUntilDisabled()
      })
    }
  
    changeItemsPerPage() {
      // Wait for the paginator to be visible
      cy.get(this.itemsPerPageLabel)
        .scrollIntoView()
        .should('be.visible')
      
      // Click the items per page dropdown
      cy.get(this.itemsPerPageSelect).click()
      
      // Select the maximum items option
      cy.get(this.maxItemsOption)
        .scrollIntoView()
        .should('be.visible')
        .click()
    }
  
    // Assertions
    verifyProductsAreVisible() {
      this.getProductCards().should("be.visible")
    }
  
    verifyProductCount(expectedCount: number) {
      this.getProductCards().should("have.length", expectedCount)
    }
  
    verifyAllProductsDisplayed(expectedCount: number) {
      // Add force option and longer timeout
      cy.get(this.paginatorRange, { timeout: 10000 })
        .should('be.visible', { force: true })
        .and('contain', `of ${expectedCount}`)

      // Verify all products are displayed
      cy.get(this.productCards)
        .should('be.visible', { force: true })
        .and('have.length', expectedCount)
    }
  
    navigateToRegistration() {
      // Click Account menu
      cy.get(this.accountButton)
        .should('be.visible')
        .click()
  
      // Click Login button from dropdown
      cy.get(this.loginButton)
        .should('be.visible')
        .click()
  
      // Click "Not yet a customer" link
      cy.get(this.notYetCustomerButton)
        .should('be.visible')
        .click()
  
      // Verify we're on registration page
      cy.url().should('include', '/#/register')
    }
  
    checkFormValidation() {
      // Click each field to trigger validation
      cy.get(this.emailInput)
        .should('be.visible')
        .click({ force: true })
      
      cy.get(this.passwordInput)
        .should('be.visible')
        .click({ force: true })
      
      cy.get(this.repeatPasswordInput)
        .should('be.visible')
        .click({ force: true })
      
      cy.get(this.securityQuestionSelect)
        .should('be.visible')
        .click({ force: true })
      
      cy.get(this.securityAnswerInput)
        .should('be.visible')
        .click({ force: true })
  
      // Assert error messages are visible
      cy.get('mat-error')
        .should('be.visible')
        .and('have.length.at.least', 1)
  
      // Reload page after validation checks
      cy.reload()
  
      // Wait for page to load completely
      cy.get(this.emailInput).should('be.visible')
    }
  
    private generateUniqueEmail(): string {
      const timestamp = new Date().getTime(); // Get current timestamp
      const randomString = Math.random().toString(36).substring(2, 8);
      return `test.user.${timestamp}.${randomString}@example.com`;
    }
  
    fillRegistrationForm() {
      cy.fixture('registration-data.json').then((testData) => {
        // Generate unique email
        const uniqueEmail = this.generateUniqueEmail();

        // Type email with delay between click and type
        cy.get(this.emailInput)
          .should('exist')
          .should('be.visible')
          .click({ force: true })
          .wait(1000)
          .type(uniqueEmail, { force: true, delay: 100 })
        
        cy.get(this.passwordInput)
          .should('be.visible')
          .clear()
          .type(testData.password, { delay: 100 })
        
        cy.get(this.repeatPasswordInput)
          .should('be.visible')
          .clear()
          .type(testData.password, { delay: 100 })
        
        // Select security question and close dropdown
        cy.get(this.securityQuestionSelect)
          .should('be.visible')
          .click({ force: true })
        
        cy.get(this.firstSecurityQuestion)
          .should('be.visible')
          .click({ force: true })
        
        // Click somewhere else on the page to close the dropdown
        cy.get('body').click(0, 0)
        
        cy.get(this.securityAnswerInput)
          .should('be.visible')
          .clear()
          .type(testData.securityAnswer, { delay: 100, force: true })

        // Store the email for login
        cy.wrap(uniqueEmail).as('registeredEmail')
      })
    }
  
    submitRegistration() {
      cy.get(this.registerButton)
        .should('be.enabled')
        .click()
  
      // Verify success message
      cy.get('.mat-simple-snack-bar-content')
        .should('be.visible')
        .and('contain', 'Registration completed successfully. You can now log in.')
    }
  
    login() {
      cy.get('@registeredEmail').then((registeredEmail) => {
        const email = registeredEmail as unknown as string;
        cy.fixture('registration-data.json').then((testData) => {
          cy.get('#email').should('be.visible')
          cy.get('#email').type(email)
          cy.get('#password').type(testData.password)
          cy.get('#loginButton').click()
          cy.url().should('include', '/#/search')
        })
      })
    }
  
    clickFirstProduct() {
      cy.get(this.firstProduct).click()
    }
  
    verifyProductDialog() {
      cy.get(this.productDialog).should('be.visible')
      cy.get(this.productImage).should('be.visible')
    }
  
    expandReviews() {
      cy.get(this.reviewsButton).click()
    }
  
    closeProductDialog() {
      cy.get(this.closeDialogButton).click()
    }
  
    // Add new methods
    addProductToBasket(productIndex: number) {
      // Wait for product grid to be visible
      cy.get(this.productGrid).should('be.visible')
      
      // Get specific product tile and click its Add to Basket button within that tile
      cy.get(this.productTile)
        .eq(productIndex)
        .within(() => {
          cy.get(this.addToBasketButton)
            .should('be.visible')
            .click()
        })

      // Verify success message pattern
      cy.get(this.successMessage)
        .should('be.visible')
        .and('contain', 'Placed')
        .and('contain', 'into basket')
    }

    verifyBasketCount(count: number) {
      cy.get(this.basketCounter)
        .should('be.visible')
        .and('contain', count.toString())
    }

    goToBasket() {
      cy.get(this.basketButton).click()
    }

    increaseProductQuantity(productIndex: number, quantity: number) {
      cy.get(this.itemQuantity).eq(productIndex)
        .clear()
        .type(quantity.toString())
    }

    deleteProduct(productIndex: number) {
      cy.get(this.deleteItemButton).eq(productIndex).click()
    }

    proceedToCheckout() {
      cy.get(this.checkoutButton)
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true })

    }

    addNewAddress() {
      cy.get(this.addressButton).click()
    }

    selectDeliveryMethod() {
      cy.get('mat-radio-button').first().click()
      cy.get(this.continueButton).click().wait(1000)
      cy.get(this.deliverySpeedButton).click({force: true})
      cy.get(this.continueButtonDelivery).click({force: true}).wait(1000)
    }

    addCreditCard() {
      // Click to expand Add New Card form
      cy.get(this.creditCardForm.addNewCardDropdown)
        .should('be.visible')
        .click()

      // Wait for form to expand
      cy.wait(1000)

      // Generate random card details
      const cardName = 'Test User'
      const cardNumber = Math.floor(Math.random() * 9000000000000000) + 1000000000000000

      // Fill in card details
      cy.get(this.creditCardForm.name)
        .should('be.visible')
        .type(cardName)

      cy.get(this.creditCardForm.cardNumber)
        .should('be.visible')
        .type(cardNumber.toString())
        .wait(3000)

      cy.get(this.creditCardForm.expiryMonth)
        .should('be.visible')
        .select('1')

      cy.get(this.creditCardForm.expiryYear)
        .should('be.visible')
        .select(1)
        
      // Submit the form
      cy.get(this.creditCardForm.submitButton)
        .should('be.visible')
        .click()

      // After submitting the card form, wait for radio button
      cy.wait(2000)

      // Select the added card
      cy.get(this.creditCardForm.cardRadioButton)
        .first()
        .click({ force: true })
        cy.wait(2000)

      // Click continue to proceed with payment
      cy.get(this.continueButtonDelivery)
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true })
    }

    placeOrder(){
      cy.get(this.placeOrderButton)
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true })
    }

    // Add method to verify basket notification
    verifyBasketNotification() {
      cy.get('.mat-snack-bar-container', { timeout: 10000 })
        .should('exist')
        .should('be.visible', { force: true })
    }

    addItemsToBasket() {
      cy.get(this.totalPriceSelector)
        .invoke('text')
        .then((initialPriceText) => {
          // Extract number from text and convert to number
          const initialPrice = parseFloat(initialPriceText.replace('Total Price: ', '').replace('¤', ''))
          cy.log(`Initial price: ${initialPrice}`)

          // Delete two items
          cy.get(this.deleteItemButton)
            .first()
            .click({ force: true })
          cy.wait(1000)

          cy.get(this.deleteItemButton)
            .first()
            .click({ force: true })
          cy.wait(1000)

          // Get new price and compare within the same chain
          cy.get(this.totalPriceSelector)
            .invoke('text')
            .then((newPriceText) => {
              const newPrice = parseFloat(newPriceText.replace('Total Price: ', '').replace('¤', ''))
              cy.log(`New price: ${newPrice}`)
              expect(newPrice).to.be.lessThan(initialPrice)
            })

          cy.wait(2000)

          // Scroll checkout button into view and click
          cy.get(this.checkoutButton)
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true })

          // Verify we're on the checkout page
          cy.url().should('include', '/#/order-summary')
        })
    }

    // Add public getter for external use
    public get totalPrice(): string {
      return this.totalPriceSelector
    }

    fillAddressForm() {
      cy.fixture('registration-data.json').then((testData) => {
        cy.get(this.addressForm.country).type(testData.address.country)
        cy.get(this.addressForm.name).type(testData.address.name)
        cy.get(this.addressForm.mobileNumber).type(testData.address.mobileNumber)
        cy.get(this.addressForm.zipCode).type(testData.address.zipCode)
        cy.get(this.addressForm.address).type(testData.address.address)
        cy.get(this.addressForm.city).type(testData.address.city)
        cy.get(this.addressForm.state).type(testData.address.state)
        
        cy.get(this.addressForm.submitButton).click()
      })
    }
}
  
export default new HomePage()
  
  