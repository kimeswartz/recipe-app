/// <reference types="Cypress" />

describe("upload a recipe", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/adminpage");

    const imageUrl = "https://pongmarket.se/thumb/13087/1280x0/KFG0440.png";

    cy.get("#addTitle").type("Banan");
    cy.get("#addDescription").type("En banan är gott");
    cy.get("#addImageUrl").type(imageUrl);
    cy.get("#addTimeInMin").type("5");
    cy.get('.category-checkbox[value="Lunch"]').check();
    cy.get("#addInstruction").type("buy banan");
    cy.get("#addInstructionBtn").click();
    cy.get("#addIngredient").type("banan");
    cy.get("#addAmount").type("2");
    cy.get("#addIngredientUnit").select("kg");
    cy.get("#addIngredientBtn").click();
    cy.get("#submitBtn").click();
  });
});
