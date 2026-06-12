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
  })

