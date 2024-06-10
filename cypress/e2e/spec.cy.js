describe("Visiting Burrito Builder", () => {
  it("Shows Burrito Builder", () => {
    cy.visit("http://localhost:3000/");
  });
});
describe("Burrito Builder", () => {
  beforeEach(()=>{
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", {
      statusCode: 200,
      fixture: 'example.json'
    }).as('burritos');
    cy.visit('http://localhost:3000')
  })
  it('shows the header', () => {
    cy.get('header').contains('h1', 'Burrito Builder')
  })
  it('shows the header form', () => {
    cy.get('form')
    cy.get('input')
    cy.get('p').contains('Order: Nothing selected')
    cy.get(':nth-child(15)').contains('Submit Order')

  })
  it('shows the orders', () => {
    cy.get('section')
    cy.get('section > :nth-child(1)')
    cy.get('section > :nth-child(2)')
    cy.get('section > :nth-child(3)')
  })
});
