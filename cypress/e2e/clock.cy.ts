describe('Clock Component Tests', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('password123{enter}');
    cy.visit('dashboard/clock');
  });

  it('loads and displays the main elements', () => {
    cy.get('div').contains('Clock In / Clock Out').should('be.visible');
    cy.get('select').should('exist');
    cy.get('button').contains('Clock-IN').should('be.visible');
  });

  it('populates the employee dropdown', () => {
    cy.get('select').should('have.length.at.least', 1);
    cy.get('select').select('Select Employee').should('have.value', '');
  });

  it('toggles the Clock-In and Clock-Out button', () => {
    // Adjust the test based on your logic.
    cy.get('button').contains('Clock-IN').click();
    cy.get('button').contains('Clock-OUT').should('be.visible');
  });

  // it('displays schedule data correctly after selecting an employee', () => {
  //   cy.intercept('GET', '**/schedulesclock?employee_id=*', {
  //     fixture: 'scheduleData.json',
  //   }).as('getSchedule');

  //   cy.get('select').select('John Doe');
  //   cy.wait('@getSchedule');

  //   cy.get('tbody tr').should('have.length.at.least', 1);
  // });
});
