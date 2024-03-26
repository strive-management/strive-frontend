describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('allows users to input email and password', () => {
    cy.get('input[name="email"]')
      .type('user@example.com')
      .should('have.value', 'user@example.com');
    cy.get('input[name="password"]')
      .type('Password123@')
      .should('have.value', 'Password123@');
  });
  it('successfully logs in through the login form', () => {
    cy.visit('/login'); // Adjust this to your application's login path

    // Replace the selectors based on your form's structure
    cy.get('input[name=email]').type('user@example.com');
    cy.get('input[name=password]').type('Password123@{enter}'); // {enter} submits the form

    // After login, check if the application redirected to the expected page
    // cy.url().should('include', '/dashboard');
  });

  //   it('displays an error for invalid login', () => {
  //     cy.get('input[name="email"]').type('wrong@example.com');
  //     cy.get('input[name="password"]').type('wrongpassword{enter}');
  //   });

  it('redirects to the dashboard on successful login', () => {
    cy.get('input[name="email"]').type('correct@example.com');
    cy.get('input[name="password"]').type('correctpassword{enter}');
    //cy.url().should('eq', Cypress.config().baseUrl + '/dashboard');
  });

  it('allows users to reset their password', () => {
    cy.get('a').contains('Forgot Password?').click();
  });

  it('navigates back to the homepage when "Go Back" is clicked', () => {
    cy.get('Link').contains('Go Back').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
