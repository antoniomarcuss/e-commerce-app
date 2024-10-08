describe("Dashboard Login", () => {
  it("login user to dashboard successfully", () => {
    cy.visit("/admin/login");
    cy.get("#email").type("admin@admin.com");
    cy.get("#password").type("admin");

    cy.intercept({
      url: `${Cypress.config("apiBaseUrl")}/auth/login`,
      method: "POST",
    }).as("login");
    cy.get("button").click();

    cy.get("button").click();

    cy.url().should("include", "/dashboard/users");

    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage[window.location.origin]).to.have.property("token");
      expect(localStorage[window.location.origin]).to.have.property(
        "refreshToken"
      );
    });
  });
});
