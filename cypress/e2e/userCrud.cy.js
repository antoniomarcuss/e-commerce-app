describe("user CRUD", () => {
  beforeEach(() => {
    cy.deleteAllUsers();
    cy.dashboardLogin("admin@admin.com", "admin");
  });
  it("Create user successful", () => {
    cy.visit("/dashboard/users");
    cy.get("a[href='/dashboard/users/create']").click();
    cy.get("input[placeholder=Nome]").type("Yago");
    cy.get("input[placeholder=E-mail]").type("yago@gmail.com");
    cy.get("input[placeholder=Senha]").type("1234");
    cy.get("select").select("USER");

    cy.get("button").contains("Cadastrar").click();

    cy.contains("yago@gmail.com");

    // ir para a segunda página dando 1, 2 e varios cliques no pagination respectivamente
    // cy.get('button.nextPage').click()

    // cy.get('button.nextPage').dblclick()

    // Cypress._.times('2', ( ) => {
    //   cy.get('button.nextPage').click()
    // })
  });

  it("Edit user successfull", () => {
    const userData = {
      name: "Thyane",
      email: "thyane@gmail.com",
      password: "1234",
    };
    const token = localStorage.getItem("token");
    cy.createUser(userData, token).then((response) => {
      cy.visit("/dashboard/users");
      cy.get(`a[href="/dashboard/users/edit/${response.body.id}"]`).click();
      cy.get('input[name="name"]').clear().type("yane");
      cy.get(".email").clear().type("yane@gmail.com");
      cy.get("button").contains("Editar").click();
      cy.contains("yane");
    });
  });
});
