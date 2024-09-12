import React from "react";
import ProductFormContent from "./index";
import "@/app/globals.css";
import formatToCurrency from "@/utils/formatToCurrency";

// Menssagem de erro - V
// Preencher formulário quando passar id - V
// Ativar o botão de editar quando o form for modificado
// Testar o botão de resetar
// Testar checkbox para enserir imagem

describe("<ProductFormContent />", () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: "/categories",
        method: "GET",
      },
      [{ id: 1, name: "Cameras" }]
    ).as("categories");
    cy.intercept(
      {
        url: "/products/*",
        method: "GET",
      },
      {
        name: "Camera Canon",
        description: "Lorem",
        price: 1200,
        stock: 5,
        category: { id: 1 },
        file: "/ecomerceHome.png",
        imgSrc: "/ecomerceHome.png",
      }
    ).as("products");
  });

  it("Must show error message", () => {
    cy.nextMount(<ProductFormContent />);
    cy.get('input[name="name"]').type("C");

    cy.get('button[type="submit"]').click();

    cy.get("#error-name").should("not.be.empty");
    cy.get("#error-price").should("not.be.empty");
    cy.get("#error-stock").should("not.be.empty");
    cy.get("#error-description").should("not.be.empty");
    cy.get("#error-category").should("not.be.empty");
  });

  it("must fill the form when id is passed to the component", () => {
    cy.nextMount(<ProductFormContent productId="1" />);

    cy.get('input[type="checkbox"]').should("be.checked");
    cy.get('input[name="name"]').should("have.value", "Camera Canon");
    cy.get('input[name="price"]').should("have.value", "1200.00");
    cy.get('input[name="stock"]').should("have.value", 5);
    cy.get("textarea").should("have.value", "Lorem");
    cy.get("select").should("have.value", "1");
  });

  it("Must active button while form is modified ", () => {
    cy.nextMount(<ProductFormContent productId="1" />);

    cy.get('input[name="name"]').clear().type("Camera Canon editada");

    cy.get("button").contains("Editar").should("be.enabled");
  });

  it("Have to reset the form ", () => {
    cy.nextMount(<ProductFormContent productId="1" />);

    cy.get('input[name="name"]').clear().type("Camera Sony editada");
    cy.get("button").contains("Resetar").click();
    cy.get('input[name="name"]').should("have.value", "Camera Canon");
  });

  it("should show image insert field", () => {
    cy.nextMount(<ProductFormContent />);
    cy.get('input[type="checkbox"]').check();
    cy.get('div[role="presentation"]').should("be.visible");
  });
});
