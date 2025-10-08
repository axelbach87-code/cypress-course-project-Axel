const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

Given('el endpoint de usuarios esta disponible', () => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/users`,
    failOnStatusCode: false
  }).then((res) => {
    expect([200, 401, 429]).to.include(res.status);
  });
});

Given("el usuario define un nuevo nombre {string} y trabajo {string}", (name, job) => {
  cy.wrap({ name, job }).as('newUser');
});

When(/^se realiza una petición GET a \/users\?page=(\d+)$/, (page) => {
  const p = Number(page);

  if (Cypress.env('MOCK_GET')) {
    const fakeData = Array.from({ length: 6 }).map((_, i) => ({
      id: i + 1,
      email: `user${i + 1}@example.com`,
      first_name: `User${i + 1}`,
      last_name: `Test`,
      avatar: `https://reqres.in/img/faces/${i + 1}-image.jpg`
    }));
    const fakeResponse = { status: 200, body: { page: p, per_page: 6, total: 12, data: fakeData } };
    return cy.wrap(fakeResponse).as('apiResponse');
  }

  return cy.request({
    method: 'GET',
    url: `${Cypress.env('API_URL')}/users`,
    qs: { page: p },
    failOnStatusCode: false
  }).as('apiResponse');
});

When(/^se realiza una petición POST a \/users$/, () => {
  if (Cypress.env('MOCK_POST')) {
    cy.intercept('POST', 'https://reqres.in/api/users', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          id: 'mock-id-1',
          name: req.body?.name || 'Morpheus',
          job: req.body?.job || 'Lider',
          createdAt: new Date().toISOString(),
        },
      });
    }).as('postUsersMock');
  }

  return cy.get('@newUser').then((u) => {
    const apiKey = Cypress.env('API_KEY');

    if (!apiKey && Cypress.env('MOCK_POST')) {
      const fakeBody = { id: 'stub-id-1', name: u.name, job: u.job, createdAt: new Date().toISOString() };
      return cy.wrap({ status: 201, body: fakeBody }).as('apiResponse');
    }

    const headers = {};
    if (apiKey) headers['x-api-key'] = apiKey;

    return cy.request({
      method: 'POST',
      url: `${Cypress.env('API_URL')}/users`,
      body: { name: u.name, job: u.job },
      headers,
      failOnStatusCode: false
    }).as('apiResponse');
  });
});

Then('el código de respuesta debe ser {int}', (status) => {
  cy.get('@apiResponse').then((res) => {
    if (res.status !== status) {
      cy.log('API response status:', res.status);
      cy.log('API response body:', JSON.stringify(res.body));
      throw new Error(`Expected status ${status} but received ${res.status}. If the API requires a key pass --env API_KEY=... or enable mocking.`);
    }
    expect(res.status).to.equal(status);
  });
});

Then('la respuesta debe contener al menos {int} usuarios', (min) => {
  cy.get('@apiResponse').its('body.data').should('have.length.gte', min);
});

Then('la respuesta contiene un id', () => {
  cy.get('@apiResponse').its('body').should('have.property', 'id');
});

Then('la estructura de cada usuario debe ser correcta', () => {
  cy.get('@apiResponse').its('body.data').then((arr) => {
    expect(arr).to.be.an('array');
    arr.forEach((user) => {
      expect(user).to.include.keys('id', 'email', 'first_name', 'last_name', 'avatar');
    });
  });
});

Then('el campo {string} de la respuesta debe ser {int}', (field, expected) => {
  function getByPath(obj, path) {
    return path.split('.').reduce((o, p) => (o && o[p] !== undefined) ? o[p] : undefined, obj);
  }
  cy.get('@apiResponse').its('body').then((body) => {
    const actual = getByPath(body, field);
    expect(actual, `body.${field}`).to.equal(expected);
  });
});

Then("los datos de {string} y {string} deben ser devueltos en la respuesta", (nameLabel, jobLabel) => {
  cy.get('@newUser').then((u) => {
    cy.get('@apiResponse').its('body').then((body) => {
      expect(body).to.have.property('name', u.name);
      expect(body).to.have.property('job', u.job);
    });
  });
});

Then(/^la respuesta debe incluir un ['"]?(.+?)['"]? autogenerado$/, (field) => {
  cy.get('@apiResponse').its('body').then((body) => {
    expect(body).to.have.property(field);
    expect(body[field]).to.not.be.oneOf([null, undefined, '']);
  });
});

Then('el timestamp de creación debe existir', () => {
  cy.get('@apiResponse').its('body').then((body) => {
    expect(body).to.have.property('createdAt');
    const createdAt = body.createdAt;
    const isoRe = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
    expect(String(createdAt)).to.match(isoRe);
  });
});
