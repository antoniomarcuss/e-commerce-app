describe("Logout", () => {
  it("Logout Dashboard user", () => {
    cy.dashboardLogin("admin@admin.com", "admin");
    cy.visit("/dashboard/users");

    cy.get("#settings").click();
    cy.get("button#logout").click();

    cy.url().should("include", "/admin/login");

    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage).not.have.property("token");
      expect(localStorage).not.have.property("refreshToken");
    });
  });

  it("Logout user", () => {
    cy.visit(`/login`);
    cy.get("input[placeholder=E-mail]").type("maria@gmail.com");
    cy.get("input[type=password]").type("1234");
    // Act
    cy.get("button").click();
    cy.url().should("include", `/`);
    cy.get("#settings").should("be.visible").click();
    cy.get("button").contains("Sair").click();
    cy.getAllLocalStorage().then((localStorage) => {
      expect(localStorage).not.have.property("token");
      expect(localStorage).not.have.property("refreshToken");
    });
  });
});
