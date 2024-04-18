/// <reference types="Cypress" />
//Alice

describe("upload a recipe", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/AdminPage");

    const imageUrl = "https://pongmarket.se/thumb/13087/1280x0/KFG0440.png";

    cy.get("#clickOpenUpload").click();
    cy.get("#addTitle").type("Banan");
    cy.get("#addDescription").type("En banan är gott");
    cy.get("#addImageUrl").type(imageUrl);
    cy.get("#addPrice").type("50");
    cy.get("#addTimeInMin").type("5");
    cy.get('#chooseCategoryCheckbox[value="Lunch"]').check();
    cy.get("#addInstruction").type("buy banan");
    cy.get("#addInstructionBtn").click();
    cy.get("#addIngredient").type("banan");
    cy.get("#addAmount").type("2");
    cy.get("#addIngredientUnit").select("kg");
    cy.get("#addIngredientBtn").click();
    cy.get("#submitBtn").click();
  });
});
