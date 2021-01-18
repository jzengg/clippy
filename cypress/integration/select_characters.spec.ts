context("Select Characters", () => {
  const text = "窗外的麻雀 在電線桿上多嘴{enter}妳說這一句 很有夏天的感觉";
  beforeEach(() => {
    cy.visit("/");
  });

  it("can add text to editor", () => {
    cy.dataCy("editor").typeInEditor(text);
  });

  it("can select text to get more information and can save characters", () => {
    // when nothing is selected, the definition list should be empty
    cy.dataCy("definition-list").should("not.exist");

    cy.dataCy("editor").typeInEditor("窗").setSelection("窗");

    // definition list should now show up
    cy.dataCy("definition-list");

    // save it
    cy.dataCy("save-button").click();

    // word should be in saved character list
    cy.dataCy("saved-word-窗");

    // editor text and saved characters should persist through reloads
    cy.reload();
    cy.dataCy("saved-word-窗");
    cy.dataCy("editor");

    // can remove saved character
    cy.get(".remove-saved-character-button").click();
    cy.dataCy("saved-word-窗").should("not.exist");
  });

  it("can save selected definition of a character", () => {
    // 觉 is a character with two definitions
    cy.dataCy("editor").typeInEditor("窗觉").setSelection("觉");

    // choose second definition
    cy.dataCy("definition-list").get('[type="radio"]').last().check();

    // save it
    cy.dataCy("save-button").click();

    // it should show up in the saved words list
    cy.dataCy("saved-word-觉");

    // change selection
    cy.dataCy("editor").setSelection("窗");

    // click saved character for which we chose second definition
    cy.dataCy("saved-word-觉")
      .should("have.class", "saved-character-highlighted")
      .click();

    // second definition should be checked
    cy.dataCy("definition-list")
      .get('[type="radio"]')
      .last()
      .should("be.checked");
  });

  it("can use keyboard shortcuts for saving a character and choosing definition", () => {
    // 觉 is a character with two definitions, choose second definition and save
    cy.dataCy("editor")
      .typeInEditor("窗觉")
      .setSelection("觉")
      .type("{cmd+downarrow}")
      .type("{cmd+s}");

    // it should show up in the saved words list
    cy.dataCy("saved-word-觉");

    // second definition should be checked
    cy.dataCy("definition-list")
      .get('[type="radio"]')
      .last()
      .should("be.checked");
  });

  it("prevents duplicates in saved characters list", () => {
    // save character
    cy.dataCy("editor").typeInEditor("觉").setSelection("觉");
    cy.dataCy("save-button").click();

    // it should show up in the saved words list
    cy.dataCy("saved-word-觉");

    // save button should be disabled
    cy.dataCy("save-button").should("be.disabled");

    // save shortcut should do nothing
    cy.dataCy("editor").typeInEditor("觉").setSelection("觉").type("{cmd+s}");

    // should only have 1 character saved
    cy.get(".saved-character-row").should("have.length", 1);
  });

  it("prevents invalid definition selection", () => {
    // type character with 3 definitions
    cy.dataCy("editor").typeInEditor("的").setSelection("的");

    // choose third definition
    cy.dataCy("definition-list").get('[type="radio"]').last().check();

    // switch to character with 2 definitions
    cy.dataCy("editor").typeInEditor("觉").setSelection("觉");
    cy.dataCy("definition-list")
      .get('[type="radio"]')
      .first()
      .should("be.checked");

    // add character with only one definition, can't go above only definition
    cy.dataCy("editor")
      .typeInEditor("窗")
      .setSelection("窗")
      .type("{cmd+uparrow}");
    cy.dataCy("definition-list")
      .get('[type="radio"]')
      .first()
      .should("be.checked");
    // can't go below only definition
    cy.dataCy("editor")
      .typeInEditor("窗")
      .setSelection("窗")
      .type("{cmd+downarrow}");
    cy.dataCy("definition-list")
      .get('[type="radio"]')
      .first()
      .should("be.checked");
  });
});
