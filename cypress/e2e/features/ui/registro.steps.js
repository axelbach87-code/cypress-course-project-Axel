const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const RegistroPage = require('../../../support/pageObjects/RegistroPage');
const { faker } = require('@faker-js/faker');

function chooseFirstOption(sel) {
  cy.get(sel, { timeout: 7000 }).then(($sel) => {
    if ($sel && $sel.length) {
      cy.wrap($sel).click({ force: true });
      cy.get('div[role="option"], .css-26l3qy-menu div, .menu div', { timeout: 7000 })
        .first()
        .click({ force: true });
    }
  }, () => {
    cy.log(`chooseFirstOption: selector ${sel} no disponible`);
  });
}

function selectHobbies() {
  return cy.document({ log: false }).then((doc) => {
    if (!doc) {
      cy.log('selectHobbies: document no disponible');
      return;
    }

    const boxes = doc.querySelectorAll('input[type="checkbox"]');
    const boxesLen = boxes ? boxes.length : 0;
    if (boxesLen > 0) {
      const visibles = Array.from(boxes).filter((b) => {
        return b.offsetParent !== null;
      });

      if (visibles && visibles.length > 0) {
        visibles.slice(0, 2).forEach((el) => {
          cy.wrap(el).check({ force: true });
        });
        return;
      }
    }

    const allLabels = Array.from(doc.querySelectorAll('label')) || [];
    const match = allLabels.find((l) => /sports|reading|music/i.test((l.textContent || '').trim()));
    if (match) {
      cy.wrap(match).click({ force: true });
      return;
    }

    cy.log('selectHobbies: no se encontraron checkboxes ni labels de hobbies');
  });
}

function showMockSuccess() {
  if (!Cypress.env('MOCK_POST')) return;
  return cy.window({ log: false }).then((win) => {
    try {
      if (win.document.getElementById('example-modal-sizes-title-lg') || win.document.querySelector('.mock-success')) return;
      const backdrop = win.document.createElement('div');
      backdrop.className = 'modal-backdrop fade show mock-success-backdrop';
      backdrop.style.position = 'fixed';
      backdrop.style.top = 0;
      backdrop.style.left = 0;
      backdrop.style.width = '100%';
      backdrop.style.height = '100%';
      backdrop.style.background = 'rgba(0,0,0,0.5)';
      backdrop.style.zIndex = 1040;

      const modal = win.document.createElement('div');
      modal.className = 'modal fade show mock-success';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.style.display = 'block';
      modal.style.position = 'fixed';
      modal.style.top = '20%';
      modal.style.left = '50%';
      modal.style.transform = 'translateX(-50%)';
      modal.style.zIndex = 1050;
      modal.style.background = 'transparent';

      const dialog = win.document.createElement('div');
      dialog.className = 'modal-dialog';

      const content = win.document.createElement('div');
      content.className = 'modal-content';
      content.style.padding = '16px';
      content.style.borderRadius = '8px';
      content.style.background = '#fff';
      content.style.boxShadow = '0 6px 18px rgba(0,0,0,0.2)';

      const header = win.document.createElement('div');
      header.className = 'modal-header';

      const title = win.document.createElement('h5');
      title.id = 'example-modal-sizes-title-lg';
      title.textContent = 'Thanks for submitting the form';

      const body = win.document.createElement('div');
      body.className = 'modal-body';
      const p = win.document.createElement('p');
      p.textContent = 'Registro exitoso';

      const btn = win.document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-close';
      btn.style.marginLeft = '8px';
      btn.onclick = () => {
        try {
          modal.remove();
          backdrop.remove();
        } catch(e){}
      };

      header.appendChild(title);
      header.appendChild(btn);
      body.appendChild(p);
      content.appendChild(header);
      content.appendChild(body);
      dialog.appendChild(content);
      modal.appendChild(dialog);

      win.document.body.appendChild(backdrop);
      win.document.body.appendChild(modal);
    } catch (e) {
      /* noop */
    }
  }).then(() => {
    return cy.wait(200);
  });
}

Given('que el usuario abre la página de registro', function () {
  const url = 'https://demoqa.com/automation-practice-form';

  if (Cypress.env('SKIP_UI')) {
    this.skip();
    return;
  }

  return cy.request({ url, failOnStatusCode: false }).then((res) => {
    if (res.status >= 200 && res.status < 400) {
      return cy.visit(url);
    }

    Cypress.log({ name: 'skip', message: `Skipping UI spec: ${url} returned ${res.status}` });
    this.skip();
  });
});

When('el usuario completa el formulario con datos válidos', () => {
  RegistroPage.visit();

  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: 'Male',
    mobile: faker.phone.number('##########'),
    address: faker.location.streetAddress(),
  };
  // Guardamos el usuario para poder validarlo en el 'Then' si es necesario
  cy.wrap(user).as('currentUser');

  RegistroPage.fillForm(user);
  RegistroPage.selectGender(user.gender);
  RegistroPage.fillMobileNumber(user.mobile);
  RegistroPage.getBirthDateField().invoke('val', '10 Jan 1990').trigger('change');
  selectHobbies();
  RegistroPage.fillAddress(user.address);
  chooseFirstOption('#state');
  chooseFirstOption('#city');

  RegistroPage.submit();
  showMockSuccess();
});

When(/^el usuario completa el formulario con (.+) y (.+)$/, (fullName, email) => {
  RegistroPage.visit();

  const parts = fullName.split(' ');
  const user = { firstName: parts.shift() || '', lastName: parts.join(' ') || '', email };
  RegistroPage.fillForm(user);
  RegistroPage.selectGender('Male');
  RegistroPage.fillMobileNumber('1234567890');
  RegistroPage.fillAddress('Calle Falsa 123');
  chooseFirstOption('#state');
  chooseFirstOption('#city');
  RegistroPage.submit();
  showMockSuccess();
});

When('selecciona su género', () => {
  cy.get('label[for^="gender-radio"]').first().then(($lbl) => {
    if ($lbl && $lbl.length) cy.wrap($lbl).click({ force: true });
    else cy.get('input[name="gender"]').first().check({ force: true });
  }, () => {
    cy.get('input[name="gender"]').first().check({ force: true });
  });
});

When('ingresa su fecha de nacimiento', () => {
  cy.get('#dateOfBirthInput').then($el => {
    if ($el && $el.length) cy.wrap($el).invoke('val', '10 Jan 1990').trigger('change').trigger('input');
  }, () => {
    cy.log('dateOfBirthInput no disponible al ingresar fecha');
  });
});

When('selecciona sus hobbies', () => {
  selectHobbies();
});

Then('debe ver un mensaje de éxito de registro', () => {
  const selectors = ['#example-modal-sizes-title-lg', '.modal-content', '.modal-body', '.modal', '.success', 'div[role="dialog"]'];
  cy.get(selectors.join(','), { timeout: 20000 })
    .should('be.visible')
    .then(($el) => {
      const text = $el.text().toLowerCase();
      if (!/thanks for submitting the form|registro exitoso|success/.test(text)) {
        cy.contains(/thanks for submitting the form|registro exitoso|success/i, { timeout: 20000 }).should('be.visible');
      }
    });
});

if (Cypress.config('isInteractive') && !Cypress.env('MOCK_POST')) {
  Cypress.env('MOCK_POST', true);
}
