  describe('Central de Atendimento ao Cliente TAT', () => {
    const LONG_TEXT = 'Nam dignissim lacinia turpis, nec malesuada metus. Proin lacinia, dui sed commodo maximus, elit elit tempor erat, non maximus nisi dolor ut massa. Integer tincidunt vehicula mattis. Vestibulum pharetra malesuada ante a cursus. Suspendisse consectetur massa id quam blandit, sit amet dignissim felis iaculis.'

    beforeEach(() => cy.visit('../../src/index.html'))

    it('verifica o título da aplicação', () => {
      cy.title().should('eq','Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', () => {

      cy.clock()

      cy.get('#firstName').type('Nometeste');
      cy.get('#lastName').type('SobreNometeste');
      cy.get('#email').type('emailteste@exemplo.com');
      cy.get('#phone').type('123456789');

      cy.get('#open-text-area').type(LONG_TEXT, { delay: 0 })

      cy.get('button[type="submit"]').click()
    
      cy.get('.success')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')

      cy.tick(3000)

      cy.get('.success')
      .should('not.be.visible')

    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

      cy.clock()

      cy.get('#firstName').type('Nometeste');
      cy.get('#lastName').type('SobreNometeste');
      cy.get('#email').type('emailsemformatacaoteste').blur();
      cy.get('#phone').type('123456789');

      cy.get('#open-text-area').type(LONG_TEXT, { delay: 0 })

      cy.get('button[type="submit"]').click()
    
      cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

      cy.tick(3000)

      cy.get('.error')
      .should('not.be.visible')
    });

    it('campo telefone permanece vazio quando preenchido com um valor não-numérico', () => {
      cy.get('#phone')
        .type('abcdefghijklmnopq')
        .should('have.value','')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
      
      cy.clock()
      
      cy.get('#firstName').type('Nometeste');
      cy.get('#lastName').type('SobreNometeste');
      cy.get('#email').type('emailsemformatacaoteste').blur();
      cy.get('#phone').type('123456789');
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type(LONG_TEXT, { delay: 0 })

      cy.get('button[type="submit"]').click()

      cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

      cy.tick(3000)

      cy.get('.error')
      .should('not.be.visible')
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

    it('envia o formulario com sucesso usando um comando personalizado', () => {
      const data = {
        firstName: 'Pedro',
        lastName: 'Souza',
        email: 'email@teste.com',
        phone: '1234567890',
        text:'TESTETESTETESTETESTETESTETESTETESTETESTETESTE.'
      }

      cy.fillMandatoryFieldsAndSubmit(data)

      cy.get('.success')
        .should('be.visible')
    });

    it('identifica o botao usando contains, preenche os campos obrigatórios e envia o formulário', () => {
      cy.get('#firstName').type('Nometeste');
      cy.get('#lastName').type('SobreNometeste');
      cy.get('#email').type('emailteste@exemplo.com');
      cy.get('#phone').type('123456789');

      cy.get('#open-text-area').type(LONG_TEXT, { delay: 0 })

      cy.contains('button','Enviar').click()
    
      cy.get('.success')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
    });

    it('seleciona o produto Youtube', () => {
      cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
    });
    
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    });
    
    it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product')
        .select(1)
        .should('have.value','blog')
    });
    
    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    });
    
    it('marca cada tipo de atendimento', () => {
      cy.get('input[type="radio"]')
        .each(typeOfService => {
          cy.wrap(typeOfService)
            .check()
            .should('be.checked')
      })
    });

    it('marca ambos checkboxes, e depois desmarca o ultimo', () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

    });

    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    });
    
    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    });
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      
      cy.fixture("example.json").as('sampleFile')
      cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
    });
    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'target', '_blank')
        .and('have.attr', 'href', 'privacy.html')
    });
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()
      
      cy.contains('h1','CAC TAT - Política de Privacidade')
        .should('be.visible')
    });


    it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
});

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal','OK')
    cy.get('@getRequest')
      .its('body')
      .should('be.include','CAC TAT')
    
  });

  it.only('achando o GATO', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
  });
    
    
  })

