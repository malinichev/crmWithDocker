describe.only('Пользователь заходит на страницу статей', () => {
    beforeEach(() => {
        cy.login().then(() => cy.visit('articles'));
    });

    it('и статьи успешно подгружаются', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });

    it('и статьи успешно подгружаются на стабах(фикстурах)', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'article-list.json' });
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });

    it.skip('Пример заскипанного теста', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
        cy.get('sdfdsf').should('asd');
    });
});
