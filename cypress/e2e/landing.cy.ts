describe('Landing Page Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads the landing page', () => {
    cy.url().should('include', '/');
    cy.get('header').should('exist');
    cy.get('main').should('exist');
    cy.get('footer').should('exist');
  });

  it('navigates to the about page', () => {
    cy.get('a').contains('About').click();
    cy.url().should('include', '/about');
  });

  it('displays the correct logo based on the theme', () => {
    // test runs with light theme
    cy.get('img[alt="logo-dark"]').should('be.visible');
    cy.get('img[alt="logo-light"]').should('not.be.visible');
  });

  it('checks for main content text', () => {
    cy.get('#hero').should('contain', 'Easily manage your team');
    cy.get('section')
      .contains('Striving to make personnel managament as easy as possible')
      .should('be.visible');
  });
});
describe('Extended Landing Page Tests', () => {
  beforeEach(() => {
    cy.visit('/'); // Adjust if your landing page is at a different route
  });

  // it('ensures the navigation menu is responsive', () => {
  //   // Check if the burger menu is not visible in desktop view
  //   cy.viewport(1280, 720);
  //   cy.get('BurgerMenuSelector').should('not.be.visible');

  //   // Change the viewport to a mobile view and check if the burger menu is visible
  //   cy.viewport('iphone-6');
  //   cy.get('BurgerMenuSelector').should('be.visible');
  // });

  it('verifies the Learn More button redirects to the about page', () => {
    cy.get('a').contains('Learn More').click();
    cy.url().should('include', '/about');
  });

  it('tests the footer content for correctness', () => {
    cy.get('footer').within(() => {
      cy.get('h2').should('contain', 'Strive Management Solutions');
      cy.get('p').should('contain', 'All Rights Reserved');
    });
  });
});
