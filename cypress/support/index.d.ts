declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;

    /**
     * Custom command to select the content in a draftJS editor.
     * @example cy.getEditorContent()
     */
    getEditorContent(): Chainable<Element>;

    /**
     * Custom command to type in a draftJS editor.
     * @example cy.typeInEditor('hello!')
     */
    typeInEditor(value: string): Chainable<Element>;

    /**
     * Custom command to naively select (highlight) based on text matching
     * @example cy.typeInEditor('hello!').setSelection('hello')
     */
    setSelection(value: string): Chainable<Element>;
  }
}
