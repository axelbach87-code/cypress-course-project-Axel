// cypress/support/commands.js

/**
 * Custom command to perform a GET request to the users endpoint.
 * @example cy.getUsers(2)
 */
Cypress.Commands.add('getUsers', (page = 1) => {
  cy.request('GET', `${Cypress.env('API_URL')}/users?page=${page}`).as('apiResponse');
});

/**
 * Custom command to perform a POST request to create a user.
 * @example cy.createUser({ name: 'morpheus', job: 'leader' })
 */
Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', `${Cypress.env('API_URL')}/users`, user).as('apiResponse');
});