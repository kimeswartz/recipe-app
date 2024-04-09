/// <reference types="Cypress" />

describe("test route about", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");

    cy.get('#footerNavigateAbout').click();

    cy.location("pathname").should("equal", "/about");
    
    
  });
}); 

describe("test route filter", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");

    cy.get('#headerNavigateFilter').click();

    cy.location("pathname").should("equal", "/filter");
    
  });
}); 
