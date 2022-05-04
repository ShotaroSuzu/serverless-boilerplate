describe('app', () => {
  it('should render', () => {
    cy.visit('http://localhost:3000');
    cy.findByText('MUIテスト');
    cy.findByText("I'll be a react expert.");
  });
});
