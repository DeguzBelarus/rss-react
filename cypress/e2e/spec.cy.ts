import '@cypress/code-coverage/support';

describe('Pages availability tests', () => {
  it('Main page is available', () => {
    cy.visit('http://localhost:3000/');
  });

  it('Purchases page is available', () => {
    cy.visit('http://localhost:3000/purchases');
  });

  it('About us page is available', () => {
    cy.visit('http://localhost:3000/about');
  });

  it('Shows the page 404 on unrouted route', () => {
    cy.visit('http://localhost:3000/404');
  });
});

describe('Elements presenting tests', () => {
  it('Elements of header are present"', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Main');
    cy.contains('Purchases');
    cy.contains('About Us');
  });
  it('Fetched cards are present', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Бенедикт');
    cy.contains('Винсент');
    cy.contains('Никки');
  });
});

describe('Page switching tests', () => {
  it('Moves to the purchases page on click the link element', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('Purchases').click();
    cy.contains('Your purchases');
    cy.url().should('include', '/purchases');
  });

  it('Moves to the about us page from the purchases page on click the link element', () => {
    cy.visit('http://localhost:3000/purchases');

    cy.contains('About Us').click();
    cy.contains('About Us');
    cy.url().should('include', '/about');
  });

  it('Returns to the main page from the about us page on click the link element', () => {
    cy.visit('http://localhost:3000/about');

    cy.contains('Main').click();
    cy.contains('Бенедикт');
    cy.url().should('equal', 'http://localhost:3000/');
  });
});

describe('Searching cards tests', () => {
  it('Finds Никки', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy=app-filter-input]').type('Никки');
    cy.get('[data-cy=app-filter-input]').should('have.value', 'Никки');
    cy.get('[data-cy=app-search-button]').click();

    cy.contains('Бенедикт').should('not.exist');
    cy.contains('Никки');
  });

  it('Mock test', () => {
    expect(true).to.equal(true);
  });
});
