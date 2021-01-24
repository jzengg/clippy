context("Select Characters", () => {
  const text = "窗外的麻雀 在電線桿上多嘴{enter}妳說這一句 很有夏天的感觉";
  beforeEach(() => {
    cy.visit("/");
  });

  it("can add text to editor", () => {
    cy.typeInEditor(text);
  });

  it("can select text to get more information and can save characters", () => {
    // when nothing is selected, the definition list should be empty
    cy.dataCy("definition-list").should("not.exist");

    // can select two characters with no definition without throwing
    cy.typeInEditor("在成").setSelection("在成");

    cy.typeInEditor("窗").setSelection("窗");

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
    cy.typeInEditor("窗觉").setSelection("觉");

    // choose second definition
    cy.dataCy("definition-list")
      .get('[name="selected-definition"]')
      .last()
      .check({ force: true });

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
      .get('[name="selected-definition"]')
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
    cy.typeInEditor("觉").setSelection("觉");
    cy.dataCy("save-button").click();

    // it should show up in the saved words list
    cy.dataCy("saved-word-觉");

    // save button should be disabled
    cy.dataCy("save-button").should("be.disabled");

    // save shortcut should do nothing
    cy.getEditorContent().setSelection("觉").type("{cmd+s}");

    // should only have 1 character saved
    cy.get(".saved-character-row").should("have.length", 1);
  });

  it("prevents invalid definition selection", () => {
    // type characters with 3, 2 and 1 definitions
    cy.typeInEditor("的觉窗").setSelection("的");

    // choose third definition
    cy.dataCy("definition-list")
      .get('[type="radio"]')
      .last()
      .check({ force: true });

    // switch to character with 2 definitions
    cy.getEditorContent().setSelection("觉");

    // selected definition should default to first definition if new character has less definitions than old
    cy.dataCy("definition-list")
      .get('[type="radio"]')
      .first()
      .should("be.checked");

    // switch to character with 1 definition
    cy.getEditorContent().setSelection("窗");

    // can't go below only definition
    cy.getEditorContent().setSelection("窗").type("{cmd+downarrow}");

    cy.dataCy("definition-list")
      .get('[type="radio"]')
      .first()
      .should("be.checked");

    // can't go above only definition
    cy.getEditorContent().setSelection("窗").type("{cmd+uparrow}");

    cy.dataCy("definition-list")
      .get('[type="radio"]')
      .first()
      .should("be.checked");
  });

  it("can switch between simplified and traditional", () => {
    // default character type is simplified
    cy.typeInEditor("電").setSelection("電");
    cy.get(".character-type-selector").should("have.value", "SIMPLIFIED");

    cy.dataCy("save-button").click();
    // shows simplified as primary and traditional as alternate
    cy.get(".selected-character").contains("电(電)");
    cy.get(".saved-character-item").contains("电(電)");

    // contains simplified radicals
    cy.get(".component-container")
      .get(".radical-meaning")
      .should("have.length", 3);

    // change character type to primary
    cy.getEditorContent().setSelection("電");
    cy.get(".character-type-selector").select("TRADITIONAL");

    // shows traditional as primary and simplified as alternate
    cy.get(".selected-character").contains("電(电)");
    cy.get(".saved-character-item").contains("電(电)");

    // contains traditional radicals
    cy.get(".component-container")
      .get(".radical-meaning")
      .should("have.length", 4);
    cy.get(".component-container").contains("雨");

    // character type should persist through reloads
    cy.reload();
    cy.getEditorContent().setSelection("電");
    cy.get(".character-type-selector").should("have.value", "TRADITIONAL");

    // character that's the same in simplified and traditional has
    // non null simplified and traditional value when saved in simplified
    cy.typeInEditor("乖").setSelection("乖");
    cy.get(".character-type-selector").select("SIMPLIFIED");
    cy.dataCy("save-button").click();
    cy.get(".character-type-selector").select("TRADITIONAL");
    cy.get(".saved-character-item").contains(/^乖$/);
  });
});
