/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

// Declare the custom commands to Cypress namespace
declare global {
  namespace Cypress {
    interface Chainable {
      navigateTo(route: string): Chainable<Element>;
      login(email: string, password: string): Chainable<Element>;
      logout(): Chainable<Element>;
    }
  }
}

// Custom commands for Expo Web
Cypress.Commands.add('navigateTo', (route: string) => {
  cy.get(`[data-testid="navigation-${route}"]`).click();
});

// Add command to handle login if needed
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click();
});
