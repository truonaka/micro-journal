describe('Micro Journal app', () => {
  beforeEach(() => {
    const today = new Date().toISOString().slice(0, 10)

    cy.intercept('GET', `**/entries/${today}`, {
      statusCode: 200,
      body: {
        id: 10,
        date: today,
        content: 'Existing content',
        mood: 'good'
      }
    }).as('getTodayEntry')

    cy.intercept('POST', '**/entries', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          id: 20,
          ...req.body
        }
      })
    }).as('saveEntry')

    cy.intercept('GET', '**/entries', {
      statusCode: 200,
      body: [
        {
          id: 1,
          date: '2026-06-01',
          content: 'First entry',
          mood: 'good'
        },
        {
          id: 2,
          date: '2026-06-02',
          content: 'Second entry',
          mood: 'great'
        }
      ]
    }).as('getEntries')

    cy.intercept('GET', '**/stats', {
      statusCode: 200,
      body: {
        good: 2,
        bad: 1
      }
    }).as('getStats')
  })

  it('loads today entry and allows saving', () => {
    cy.visit('/')
    cy.wait('@getTodayEntry')

    cy.contains("Today's Entry").should('be.visible')
    cy.get('textarea.today-textarea').should('have.value', 'Existing content')

    cy.contains('button', 'Bad').click()
    cy.contains('button', 'Save').click()

    cy.wait('@saveEntry').then(({ request }) => {
      expect(request.body).to.include({
        content: 'Existing content',
        mood: 'bad'
      })
      expect(request.body.date).to.match(/^\d{4}-\d{2}-\d{2}$/)
    })

    cy.contains('Saved!').should('be.visible')
  })

  it('navigates entries and calendar views', () => {
    cy.visit('/')
    cy.wait('@getTodayEntry')

    cy.contains('a', 'Entries').click()
    cy.url().should('include', '/entries')
    cy.wait('@getEntries')

    cy.contains('Entries').should('be.visible')
    cy.contains('First entry').should('be.visible')
    cy.contains('Second entry').should('be.visible')

    cy.contains('a', 'Calendar').click()
    cy.url().should('include', '/calendar')
    cy.wait('@getEntries')
    cy.wait('@getStats')

    cy.contains('Calendar').should('be.visible')
    cy.contains('Legend:').should('be.visible')
    cy.contains('Most common mood (all time):').should('be.visible')
  })
})
