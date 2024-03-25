describe('Schedule Component Tests', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('password123{enter}');
    cy.visit('/dashboard/schedule');
  });

  it('successfully loads and displays key elements', () => {
    cy.get('div').contains('Update Schedule').should('be.visible');
    cy.get('select').should('exist');
    cy.get('button').contains('Click here to update schedules').should('exist');
  });

  it('toggles availability status', () => {
    cy.get('#avail-button button').contains('Not Available').click();

    cy.get('#avail-button button').contains('Available');
  });

  it('allows posting a new schedule', () => {
    cy.intercept('POST', '**/schedules', {
      statusCode: 200,
      body: { id: 123 /* Rest of the schedule info */ },
    }).as('postSchedule');

    cy.get('select').select('John Doe');

    cy.get('button').contains('Click here to update schedules').click();

    cy.wait('@postSchedule');
  });
});
