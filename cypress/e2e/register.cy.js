describe("Register", () => {
  beforeEach(() => {
    cy.deleteAllUsers();
  });
  it("register user successfully", () => {
    cy.visit("/register");
    cy.get("input[placeholder=Nome]").type("newUser");
    cy.get("#email").type("newUser@gmail.com");
    cy.get(".password").type("1234");
    cy.get(`input[placeholder='Confirmar senha']`).type("1234");

    cy.get("button").click();

    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage[window.location.origin]).to.have.property("token");
      expect(localStorage[window.location.origin]).to.have.property(
        "refreshToken"
      );
    });

    // seta uma token
    // seta uma refreshToken
    // autenctica o usuário
  });
});
