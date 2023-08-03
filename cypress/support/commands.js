Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Andrew')
    cy.get('#lastName').type('Dutra')
    cy.get('#email').type('andrew@exemplo.com')
    cy.get('#open-text-area').type('teste andrew')
    cy.contains('button', 'Enviar').click()
})