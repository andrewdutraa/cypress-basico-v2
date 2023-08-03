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
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Andrew')
        cy.get('#lastName').type('Dutra')
        cy.get('#email').type('andrew@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-númerico', function(){
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Andrew')
        cy.get('#lastName').type('Dutra')
        cy.get('#email').type('andrew@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Andrew')
          .should('have.value', 'Andrew')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Dutra Jorge')
          .should('have.value', 'Dutra Jorge')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('andrew@exemplo.com')
          .should('have.value', 'andrew@exemplo.com')
          .clear()
          .should('have.value', '')
        cy.get('#open-text-area')
          .type('teste')
          .should('have.value', 'teste')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('1234567890')
          .should('have.value', '1234567890')
          .clear()
          .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        
        cy.get('.success').should('be.visible')
  })

})  