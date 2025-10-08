import '@badeball/cypress-cucumber-preprocessor'; 
import './commands';

// Ignora errores "Script error." coming from cross‑origin scripts para no fallar tests UI
Cypress.on('uncaught:exception', (err) => {
  const msg = err && err.message ? err.message.toLowerCase() : '';
  if (msg.includes('script error') || msg.includes('cross origin')) {
    // returning false prevents Cypress from failing the test
    return false;
  }
  // Ignora el error "cannot read properties of null (reading 'getMonth')" generado por el datepicker
  if (msg.includes("cannot read properties of null") && msg.includes('getmonth')) {
    return false;
  }
  // otherwise let Cypress fail so real app errors surface
  return true;
});