const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

let precioProducto = '';

Given('el usuario abre la web de automation exercise', () => {
  cy.visit('https://automationexercise.com/');
});

When('el usuario hace clic en el boton products', () => {
  cy.get('a[href="/products"]').click();
});

When('el usuario realiza la busqueda del producto {string}', (producto) => {
  cy.get('#search_product').type(producto);
  cy.get('#submit_search').click();
});

When('el usuario obtiene el precio del producto', () => {
  cy.get('.product-info .product-price').first().then(($el) => {
    precioProducto = $el.text();
  });
});

When('el usuario hace clic en el boton view product', () => {
  cy.get('.product-info .view-product').first().click();
});

Then('el sistema muestra la informacion del producto {string}', (producto) => {
  cy.get('h2').should('contain.text', producto);
});

Then('el sistema muestra el mismo precio del producto que se obtuvo en la busqueda', () => {
  cy.get('.product-information .product_price').should('contain.text', precioProducto);
});