import '@badeball/cypress-cucumber-preprocessor'; 
import './commands';


Cypress.on('uncaught:exception', (err) => {
  const msg = err && err.message ? err.message.toLowerCase() : '';
  if (msg.includes('script error') || msg.includes('cross origin')) {
    
    return false;
  }
  
  if (msg.includes("cannot read properties of null") && msg.includes('getmonth')) {
    return false;
  }
  
  return true;
});