/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equals', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia formulário', function() {
        const longtext = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        
        cy.get('#firstName').type('Andrew')
        cy.get('#lastName').type('Dutra')
        cy.get('#email').type('andrew@exemplo.com')
        cy.get('#open-text-area').type(longtext,{delay: 0 })
        cy.get('.button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Andrew')
        cy.get('#lastName').type('Dutra')
        cy.get('#email').type('andrew@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it.only('campo telefone continua vazio quando preenchido com valor não-númerico', function(){
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '')
    })
  })