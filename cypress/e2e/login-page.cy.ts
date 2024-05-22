describe('Login page', () => {
  it('should show an error when login credentials are invalid', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="email-input"]').type('thisuserdoesnotexist@email.com');
    cy.get('[data-testid="password-input"]').type('passssssswordddddd');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="login-incorrect-credentials"]').should('exist');
  });
});
