


  describe('Landing Page Tests', () => {
    beforeEach(() => {
      cy.visit('/'); // Adjust if your landing page is at a different route
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
      // Assuming the test runs with light theme by default
      cy.get('img[alt="logo-dark"]').should('be.visible');
      cy.get('img[alt="logo-light"]').should('not.be.visible');
  
      // Here you would need a way to toggle the theme to dark, 
      // which might involve clicking a button or using a custom command if your app supports it.
      // After switching to dark theme, you would check if the light logo is not visible and the dark logo is visible.
    });
  
    it('checks for main content text', () => {
      cy.get('#hero').should('contain', 'Easily manage your team');
      cy.get('section').contains('Striving to make personnel managament as easy as possible').should('be.visible');
    });
  
    it('ensures icon visibility changes with theme', () => {
      // Similar to the logo test, you would verify the icons for both light and dark themes.
      // This is just an example for one icon; repeat for others as needed.
      cy.get('img[alt="fast-black"]').should('be.visible');
      cy.get('img[alt="fast-white"]').should('not.be.visible');
      
      // Switch to dark theme and test the visibility again.
    });
  
    // Add more tests as needed for other functionalities like testing the BurgerMenu component's functionality.
  });