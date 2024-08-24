describe("Login", () => {
  beforeEach(() => {
    cy.login("admin@admin.com", "admin").then((response) => {
      cy.deleteAllUsers();
      cy.request({
        url: `${Cypress.config("apiBaseUrl")}/users`,
        method: "POST",
        headers: { Authorization: `Bearer ${response.body.token}` },
        body: { name: "maria", email: "maria@gmail.com", password: "1234" },
      });
    });
  });
  it("login user successful", () => {
    // Arranje

    cy.visit(`/login`);
    cy.get("input[placeholder=E-mail]").type("maria@gmail.com");
    cy.get("input[type=password]").type("1234");

    // Act
    cy.get("button").click();

    //Assert
    cy.url().should("equal", `${Cypress.config("baseUrl")}/`);
    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage[window.location.origin]).to.have.property("token");
      expect(localStorage[window.location.origin]).to.have.property(
        "refreshToken"
      );
    });
  });

  // Uma token é setada
  // Uma refreshToken é setada
  // o usuário é redirecionado para a home
});
