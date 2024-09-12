describe("Category Crud", () => {
  beforeEach(() => {
    cy.dashboardLogin("admin@admin.com", "admin").then(() => {
      cy.deleteAllCategories(localStorage.getItem("token"));
    });
  });
  it("Create Categories successful", () => {
    cy.visit("/dashboard/categories");
    cy.get(`a[href="/dashboard/categories/create"]`).click();
    cy.get('input[name="name"]').type("Cameras");
    cy.get("button").contains("Cadastrar").click();
    cy.contains("Cameras");
  });
  it("Edit Categories successful", () => {
    cy.request({
      url: `${Cypress.config("apiBaseUrl")}/categories`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: {
        name: "Cameras",
      },
    }).then((response) => {
      cy.visit("/dashboard/categories");
      cy.get(
        `a[href="/dashboard/categories/edit/${response.body.id}"]`
      ).click();
      cy.get('input[name="name"]').clear().type("Camera Sony");
      cy.intercept({
        url: `${Cypress.config("apiBaseUrl")}/categories/${response.body.id}`,
        method: "PUT",
      }).as("editCategory");
      cy.get("button").contains("Editar").click();
      cy.contains("Camera Sony");
      cy.wait("@editCategory").then((intercept) => {
        expect(intercept.response.statusCode).to.eq(200); // Verifica se a edição foi bem-sucedida
      });
    });
  });
});
