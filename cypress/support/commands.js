// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  return cy.request({
    url: `${Cypress.config("apiBaseUrl")}/auth/login`,
    method: "POST",
    body: {
      email,
      password,
    },
  });
});

Cypress.Commands.add("deleteAllUsers", () => {
  cy.login("admin@admin.com", "admin").then((response) => {
    cy.request({
      url: `${Cypress.config("apiBaseUrl")}/users/all`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${response.body.token}`,
      },
    });
  });
});

Cypress.Commands.add("dashboardLogin", (email, password) => {
  cy.session(
    email,
    () => {
      cy.visit("/admin/login");
      cy.get("#email").type(email);
      cy.get("#password").type(password);

      cy.get("button").contains("Entrar").click();

      cy.url().should("include", "/dashboard/users");
    },
    {
      validate: () => {
        cy.getAllLocalStorage().then((localStorage) => {
          expect(localStorage[window.location.origin]).to.have.property(
            "token"
          );
          expect(localStorage[window.location.origin]).to.have.property(
            "refreshToken"
          );
        });
      },
    }
  );
});

Cypress.Commands.add("createUser", (body, token) => {
  cy.request({
    url: `${Cypress.config("apiBaseUrl")}/users`,
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body,
  });
});
