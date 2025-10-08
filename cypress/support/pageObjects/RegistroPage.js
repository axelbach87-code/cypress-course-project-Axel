class RegistroPage {
  // Selectores
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

  // Acciones
  visit() {
    cy.visit("/automation-practice-form");
  }

  fillForm(user) { // Rellena solo los campos de texto principales
    this.getFirstNameField().type(user.firstName);
    this.getLastNameField().type(user.lastName);
    this.getEmailField().type(user.email);
  }

  selectGender(gender) {
    // Busca el input de radio con el valor del género y lo marca.
    // 'gender' debe ser: 'Male', 'Female' o 'Other'
    cy.get(`input[name="gender"][value="${gender}"]`).check({ force: true });
  }
  
  fillMobileNumber(mobile) {
    this.getMobileNumberField().type(mobile);
  }

  fillBirthDate(day, month, year) {
    this.getBirthDateField().click();
    // month y year deben ser el nombre/número visible en el select (e.g., 'June', '1990')
    cy.get(".react-datepicker__month-select").select(month);
    cy.get(".react-datepicker__year-select").select(year);
    // Nota: el selector del día asume el formato de la librería react-datepicker de demoqa
    cy.get(`.react-datepicker__day--0${day}`).click(); 
  }
  
  fillSubjects(subjects) {
    subjects.forEach(subject => {
      this.getSubjectsField().type(`${subject}{enter}`);
    });
  }

  selectHobbies(hobbies) {
    // Itera sobre el array de hobbies y hace clic en la etiqueta correspondiente.
    // 'hobbies' debe ser un array de valores (e.g., ['1', '2', '3'])
    hobbies.forEach(hobby => {
      cy.get(`#hobbies-checkbox-${hobby}`).check({ force: true });
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
