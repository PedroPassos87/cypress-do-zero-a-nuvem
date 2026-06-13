  describe('Central de Atendimento ao Cliente TAT', () => {
    const LONG_TEXT = 'Nam dignissim lacinia turpis, nec malesuada metus. Proin lacinia, dui sed commodo maximus, elit elit tempor erat, non maximus nisi dolor ut massa. Integer tincidunt vehicula mattis. Vestibulum pharetra malesuada ante a cursus. Suspendisse consectetur massa id quam blandit, sit amet dignissim felis iaculis.'

    beforeEach(() => cy.visit('../../src/index.html'))

    it('verifica o título da aplicação', () => {
      cy.title().should('eq','Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
      cy.get('#firstName').type('Nometeste');
      cy.get('#lastName').type('SobreNometeste');
      cy.get('#email').type('emailteste@exemplo.com');
      cy.get('#phone').type('123456789');

      cy.get('#open-text-area').type(LONG_TEXT, { delay: 0 })

      cy.get('button[type="submit"]').click()
    
      cy.get('.success')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
      cy.get('#firstName').type('Nometeste');
      cy.get('#lastName').type('SobreNometeste');
      cy.get('#email').type('emailsemformatacaoteste').blur();
      cy.get('#phone').type('123456789');

      cy.get('#open-text-area').type(LONG_TEXT, { delay: 0 })

      cy.get('button[type="submit"]').click()
    
      cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
    });

    it('campo telefone permanece vazio quando preenchido com um valor não-numérico', () => {
      cy.get('#phone')
        .type('abcdefghijklmnopq')
        .should('have.value','')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      cy.get('#firstName').type('Nometeste');
      cy.get('#lastName').type('SobreNometeste');
      cy.get('#email').type('emailsemformatacaoteste').blur();
      cy.get('#phone').type('123456789');

      cy.get('#open-text-area').type(LONG_TEXT, { delay: 0 })

      cy.get('button[type="submit"]').click()

      cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Pedro')
      .should('have.value', 'Pedro')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Carreira')
      .should('have.value', 'Carreira')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('pedro@exemplo.com')
      .should('have.value', 'pedro@exemplo.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
      cy.get('button[type="submit"]').click()

      cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
    });

    it.only('envia o formulario com sucesso usando um comando personalizado', () => {
  
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success')
        .should('be.visible')
    });
  })

