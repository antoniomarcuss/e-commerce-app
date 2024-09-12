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

const {
  default: QueryClientProvider,
} = require("../../src/app/Providers/QueryClientProvider");
const {
  AppRouterContext,
} = require("next/dist/shared/lib/app-router-context.shared-runtime");

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

Cypress.Commands.add("createProducts", (body, token) => {
  cy.request({
    url: `${Cypress.config("apiBaseUrl")}/products`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
});

Cypress.Commands.add("createCategory", (body, token) => {
  cy.request({
    url: `${Cypress.config("apiBaseUrl")}/categories`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
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

Cypress.Commands.add("deleteAllProducts", (token) => {
  cy.request({
    url: `${Cypress.config("apiBaseUrl")}/products/all`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
});

Cypress.Commands.add("deleteAllCategories", (token) => {
  cy.request({
    url: `${Cypress.config("apiBaseUrl")}/categories/all`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });
});

Cypress.Commands.add("nextMount", (component, options) => {
  // Mock a `Router`, enable asserting against function calls using `cy.stub`: ( cy.get('@router:back').should(...) )
  const router = {
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    basePath: "",
    back: cy.stub().as("router:back"),
    forward: cy.stub().as("router:forward"),
    push: cy.stub().as("router:push"),
    reload: cy.stub().as("router:reload"),
    replace: cy.stub().as("router:replace"),
    isReady: true,
    ...(options?.router || {}),
  };
  // Mock a `HeadManager`, enable asserting against additions via `<Head />` & `<Script />` using `cy.stub`
  // const headManager = {
  //   updateHead: cy.stub().as("head:updateHead"),
  //   mountedInstances: new Set(),
  //   updateScripts: cy.stub().as("head:updateScripts"),
  //   scripts: new Set(),
  //   getIsSsr: () => false,
  //   appDir: false,
  //   nonce: "_",
  //   ...(options?.head || {}),
  // };

  cy.intercept("_next/image*", { fixture: "ecomerceHome.png" });

  return cy.mount(
    <AppRouterContext.Provider value={router}>
      <QueryClientProvider>{component}</QueryClientProvider>
    </AppRouterContext.Provider>,
    options
  );
});
