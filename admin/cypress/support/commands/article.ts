import { Article } from '../../../src/entities/Article';

const defaultArticle = {
    title: 'Тестовая статья',
    subtitle: 'подзаголовок тестовой статьи',
    img: 'https://api.slingacademy.com/public/sample-users/1.png',
    views: 10,
    createdAt: '01.01.2024',
    type: ['IT'],
    blocks: [],
} as Omit<Article, 'id' | 'user'>;

export const removeArticle = (articleId: string) => {
    return cy.request({
        method: 'DELETE',
        headers: { Authorization: 'asdasd' },
        url: `http://localhost:8000/articles/${articleId}`,
    });
};

export const createArticle = (userId: string, article?: Article) => {
    let body = { ...defaultArticle, userId };

    if (article) {
        body = { ...article, userId };
    }
    return cy
        .request({
            method: 'POST',
            headers: { Authorization: 'asdasd' },
            url: 'http://localhost:8000/articles',
            body,
        })
        .then(({ body }) => body);
};

declare global {
    namespace Cypress {
        interface Chainable {
            removeArticle(articleId: string): Chainable<void>;
            createArticle(
                userId: string,
                article?: Omit<Article, 'id' | 'user'>,
            ): Chainable<Article>;
        }
    }
}
