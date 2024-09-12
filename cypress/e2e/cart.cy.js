const formatToCurrency = require("../../src/utils/formatToCurrency");

describe("Cart", () => {
  let productId;
  beforeEach(() => {
    cy.login("admin@admin.com", "admin").then(({ body: { token } }) => {
      cy.deleteAllProducts(token);
      cy.deleteAllCategories(token);
      cy.createCategory({ name: "Cameras" }, token).then((res) => {
        cy.createProducts(
          {
            name: "Camera Sony",
            price: 1500,
            stock: 10,
            description: "Camera Sony",
            categoryId: res.body.id,
          },
          token
        ).then((response) => {
          productId = response.body.id; // Captura o ID do produto
          expect(productId).to.not.be.undefined; // Garante que o ID do produto foi capturado
        });
      });
    });
  });
  it("Add item cart", () => {
    const cartTotal = 1500;
    cy.visit("/");
    cy.get("button.add-to-cart-btn").first().click();
    cy.visit("/cart");
    cy.contains("Camera Sony");
    cy.get("#total").should(
      "have.text",
      `Total: ${formatToCurrency(cartTotal)}`
    );
  });

  it("Remove cart successful", () => {
    const cartTotal = 0;
    cy.visit("/");
    cy.get("button.add-to-cart-btn").first().click();
    cy.visit("/cart");
    cy.get("button.delete-item-to-cart").first().click();

    cy.get("button").contains("Confirmar").click();

    cy.contains("Camera Sony").should("not.exist");
    cy.get("#total").should(
      "have.text",
      `Total: ${formatToCurrency(cartTotal)}`
    );
  });

  it("increase cart quantity ", () => {
    const cartTotal = 6000;
    cy.visit("/");
    cy.get("button.add-to-cart-btn").first().click();
    cy.visit("/cart");
    Cypress._.times(3, () => {
      cy.get("button.plus-btn").first().click();
    });
    cy.get("#total").should(
      "have.text",
      `Total: ${formatToCurrency(cartTotal)}`
    );
  });

  it("decrease cart quantity", () => {
    const cartTotal = 4500;
    cy.visit("/");
    cy.get("button.add-to-cart-btn").first().click();
    cy.visit("/cart");

    Cypress._.times(3, () => {
      cy.get("button.plus-btn").first().click();
    });
    cy.get("button.minus-btn").first().click();

    cy.get("#total").should(
      "have.text",
      `Total: ${formatToCurrency(cartTotal)}`
    );
    cy.get("input").first().should("have.value", 3);
  });

  it("view product and add to cart", () => {
    const currentPage = 1;
    cy.visit("/");
    cy.visit(`/viewProduct/${productId}?page=${currentPage}"]`);
    cy.contains("Camera Sony");
    cy.log("ola mundo!");
    cy.get("button.add-to-cart-btn").click();
    cy.get(`a[href='/?page=${currentPage}']`).click();
  });
});
