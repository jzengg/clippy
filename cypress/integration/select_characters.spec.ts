context("Select Characters", () => {
  const text = "窗外的麻雀 在電線桿上多嘴{enter}妳說這一句 很有夏天的感覺";
  beforeEach(() => {
    cy.visit("/");
  });

  it("can add text to middle panel", () => {
    cy.dataCy("editor").typeInEditor(text);
  });

  it("can select text to get more information", () => {
    // when nothing is selected, the definition list should be empty
    cy.dataCy("definition-list").should("not.exist");

    // highlight text https://github.com/cypress-io/cypress/issues/2839
    cy.dataCy("editor")
      .typeInEditor("窗")
      .trigger("mousedown")
      .then(($el) => {
        const el = $el[0];
        const document = el.ownerDocument;
        const range = document.createRange();
        range.selectNodeContents(el);
        document.getSelection().removeAllRanges(range);
        document.getSelection().addRange(range);
      })
      .trigger("mouseup");
    cy.document().trigger("selectionchange");

    // definition list should now show up
    cy.dataCy("definition-list");

    // save it
    cy.dataCy("save-button").click();

    // it should show up in the saved words list
    cy.dataCy("saved-word-窗");
  });
});
