class RegistroPage {
  getFirstNameField() { return cy.get("#firstName"); }
  getLastNameField() { return cy.get("#lastName"); }
  getEmailField() { return cy.get("#userEmail"); }
  getBirthDateField() { return cy.get("#dateOfBirthInput"); }
  getMobileNumberField() { return cy.get("#userNumber"); }
  getSubjectsField() { return cy.get('#subjectsInput'); }
  getAddressField() { return cy.get('#currentAddress'); }
  getStateDropdown() { return cy.get('#state'); }
  getCityDropdown() { return cy.get('#city'); }
  getSubmitButton() { return cy.get("#submit"); }
  getSuccessModal() { return cy.get(".modal-content"); }
  getSuccessModalHeader() { return cy.get(".modal-header"); }

  visit() {
    cy.visit("/automation-practice-form");
  }

  fillForm(user) {
    this.getFirstNameField().type(user.firstName);
    this.getLastNameField().type(user.lastName);
    this.getEmailField().type(user.email);
  }

  selectGender(gender) {
    cy.get(`input[name="gender"][value="${gender}"]`).check({ force: true });
  }
  
  fillMobileNumber(mobile) {
    this.getMobileNumberField().type(mobile);
  }

  fillBirthDate(day, month, year) {
    this.getBirthDateField().click();
    cy.get(".react-datepicker__month-select").select(month);
    cy.get(".react-datepicker__year-select").select(year);
    cy.get(`.react-datepicker__day--0${day}`).click(); 
  }
  
  fillSubjects(subjects) {
    subjects.forEach(subject => {
      this.getSubjectsField().type(`${subject}{enter}`);
    });
  }

  selectHobbies(hobbies) {
    hobbies.forEach(hobby => {
      cy.get(`#hobbies-checkbox-${hobby}`).check({ force: true });
      cy.get('.custom-control-label').contains(hobby).click();
    });
  }
  
  fillAddress(address) {
    this.getAddressField().type(address);
  }

  selectStateAndCity(state, city) {
    this.getStateDropdown().click().contains(state).click();
    this.getCityDropdown().click().contains(city).click();
  }

  submit() {
    this.getSubmitButton().click({ force: true });
  }

  getSuccessMessage() {
    return this.getSuccessModal();
  }

  getModalRow(label) {
    return cy.get('td').contains(label).next('td');
  }
}

module.exports = new RegistroPage();
