describe('Dashboard Component Tests', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('password123{enter}');
    cy.visit('/dashboard'); // Adjust this to your application's dashboard path
  });

  it('successfully loads the Dashboard component', () => {
    cy.get('div').contains('Dashboard').should('be.visible'); // Check for a unique element or text in your Dashboard
  });
  //   it('renders all child components', () => {
  //     cy.get('Header').should('exist');
  //     cy.get('SideNavBar').should('exist');
  //     cy.get('DateAndTime').should('exist');
  //     cy.get('StaffTracking').should('exist');

  //     cy.get('canvas').should('have.length', 3);
  //   });
  //   it('loads and displays chart data correctly', () => {
  //     // Intercept API calls and provide mock responses
  //     cy.intercept('GET', '/api/staffNumbersByDepartment', {
  //       fixture: '',
  //     });
  //     cy.intercept('GET', '/api/jobRoles', {
  //       fixture: 'jobRoles.json',
  //     });
  //     cy.intercept('GET', '/api/staffLocations', {
  //       fixture: 'staffLocations.json',
  //     });

  //     cy.visit('/dashboard');

  //   });
});
