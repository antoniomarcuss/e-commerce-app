describe("Products", () => {
  beforeEach(() => {
    cy.login("admin@admin.com", "admin")
      .as("login")
      .then(({ body: { token } }) => {
        cy.deleteAllProducts(token);
        cy.deleteAllCategories(token);
      });
  });
  it("Search Products successful", () => {
    cy.get("@login").then(({ body: { token } }) => {
      cy.createCategory({ name: "Smartphones" }, token).then((categoryRes) => {
        cy.createProducts(
          {
            name: "Iphone 15",
            price: 10000,
            stock: 10,
            description: "Iphone 15 descefef",
            categoryId: categoryRes.body.id,
          },
          token
        );
      });
    });
    cy.visit("/");

    cy.get("input[type='search']").type("Iphone 15");

    cy.get("h2").contains("Iphone 15");
  });
  it("must show product not foundl", () => {
    cy.visit("/");
    cy.get("input[type='search']").type("Iphone 15");
    cy.get("p").contains("Produto não encontrado.");
  });
});
