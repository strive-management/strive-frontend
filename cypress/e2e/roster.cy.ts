describe('Roster Page Tests', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('password123{enter}');
    cy.visit('/dashboard/roster');
  });

  //   it('fetches and displays employee information correctly', () => {
  //     cy.intercept('GET', '**/someEmployees*').as('getEmployees');
  //     cy.wait('@getEmployees').its('response.statusCode').should('eq', 200);

  //     cy.get('table').should('exist');
  //     cy.get('tbody tr').should('have.length.at.least', 1);
  //   });

  //   it('opens the edit modal and allows for employee editing', () => {
  //     cy.get('button').contains('Edit').first().click();
  //     cy.get('EditModalSelector').should('be.visible'); // Replace 'EditModalSelector' with the actual selector for your modal

  //     // Simulate editing an employee's information
  //     cy.get('input[name="first_name"]').clear().type('John');
  //     cy.get('EditModalSubmitButtonSelector').click();
  //   });

  //   it('opens the delete modal and allows for employee deletion', () => {
  //     const initialRowCount = cy.get('tbody tr').its('length');

  //     cy.get('button').contains('Delete').first().click();
  //     cy.get('DeleteModalSelector').should('be.visible');
  //     cy.get('DeleteModalConfirmButtonSelector').click();

  //     const updatedRowCount = cy.get('tbody tr').its('length');
  //     expect(updatedRowCount).to.be.lessThan(initialRowCount);
  //   });

  it('handles API errors gracefully', () => {
    // Simulate an API failure
    cy.intercept('GET', '**/someEmployees*', { statusCode: 500 }).as(
      'getEmployeesFail'
    );
    cy.visit('dashboard/roster');
  });
});
