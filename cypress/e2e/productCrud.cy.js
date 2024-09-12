describe("Product CRUD", () => {
  beforeEach(() => {
    cy.dashboardLogin("admin@admin.com", "admin").then(() => {
      cy.deleteAllCategories(localStorage.getItem("token"));
      cy.deleteAllProducts(localStorage.getItem("token"));
      cy.createCategory({ name: "Cameras" }, localStorage.getItem("token")).as(
        "category"
      );
    });
  });
  it("Create products successfully", () => {
    cy.visit("/dashboard/products");
    cy.get("a[href='/dashboard/products/create']").click();
    cy.get("#insertImg").check();
    cy.get("input[type='file']").selectFile("public/vercel.svg", {
      force: true,
    });
    cy.get("#name").type("Camera");
    cy.get("#price").type("233");
    cy.get("#stock").type("10");
    cy.get("#description").type("Camera Canon");
    cy.get("select").select("Cameras");
    cy.intercept({
      url: `${Cypress.config("apiBaseUrl")}/products`,
      method: "POST",
    }).as("createProduct");
    cy.get("button").contains("Cadastrar").click();
    cy.contains("Camera");
    cy.wait("@createProduct").then((intercept) => {
      cy.contains(intercept.response.body.id); // Agora espera até que o produto "monitor" apareça na página
      expect(intercept.response.statusCode).to.eq(201); // Verifica se a criação foi bem-sucedida
    });
  });

  it("Edit user successfully", () => {
    cy.get("@category").then((response) => {
      cy.createProducts(
        {
          name: "Camera",
          price: 12000,
          stock: 5,
          description: "camera sony",
          categoryId: response.body.id,
        },
        localStorage.getItem("token")
      ).then((productRes) => {
        cy.visit("/dashboard/products");
        cy.get(
          `a[href='/dashboard/products/edit/${productRes.body.id}']`
        ).click();
        cy.get("#insertImg").check();
        cy.get('div[role="presentation"]').selectFile("public/next.svg", {
          action: "drag-drop",
        });
        cy.get("#name").clear().type("Camera editada");
        cy.get("#price").clear().type("22033");
        cy.get("#stock").clear().type("20");
        cy.get("#description").clear().type("Camera Sony");
        cy.get("select").select("Cameras");
        cy.intercept({
          url: `${Cypress.config("apiBaseUrl")}/products/${productRes.body.id}`,
          method: "PUT",
        }).as("editProduct");
        cy.get("button").contains("Editar").click();
        cy.contains("Camera editada");
        cy.wait("@editProduct").then((intercept) => {
          expect(intercept.request.body.name).to.eq("Camera editada");
          expect(intercept.response.statusCode).to.eq(200); // Verifica se a edição foi bem-sucedida
        });
      });
    });
  });
});
