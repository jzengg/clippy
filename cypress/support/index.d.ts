declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;

    /**
     * Custom command to type in a draftJS editor.
     * @example cy.typeInEditor('hello!')
     */
    typeInEditor(value: string): Chainable<Element>;

    // setSelection(
    //   subject: Element,
    //   query: string,
    //   endQuery: string
    // ): Chainable<Element>;
  }
}
