Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {

    cy.get('#firstName').type('Nometeste');
    cy.get('#lastName').type('SobreNometeste');
    cy.get('#email').type('emailteste@exemplo.com');
    cy.get('#phone').type('123456789');
    cy.get('#open-text-area').type('teste.')
    cy.get('button[type="submit"]').click()
})