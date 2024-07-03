import { Article } from '../../../src/entities/Article';

let userId = '';
let articleId = '';

const testArticle = {
    id: 'test_article',
    title: 'Тестовая статья',
    subtitle: 'подзаголовок тестовой статьи',
    img: 'https://api.slingacademy.com/public/sample-users/1.png',
    views: 10,
    createdAt: '01.01.2024',
    type: ['IT'],
    blocks: [],
} as Omit<Article, 'id' | 'user'>;

describe.only('Пользователь заходит на страницу статей', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            userId = data.id;
            cy.createArticle(userId, testArticle).then((articleData) => {
                articleId = articleData.id;
                cy.visit(`/articles/${articleData.id}`);
            });
        });
    });

    afterEach(() => {
        cy.removeArticle(articleId);
    });

    describe('Работает на реальном АПИ', () => {
        it('и статьи успешно подгружаются', () => {
            cy.getByTestId('ArticleDetail.Info').should('exist');
            cy.getByTestId('Title.Header').contains(testArticle.title);
            cy.getByTestId('Title.Paragraph').contains(testArticle.subtitle);
        });

        it('и подгружаются список рекомендаций', () => {
            cy.getByTestId('ArticleRecommendationList').should('exist');
        });

        it('и оставляет комментарий', () => {
            cy.getByTestId('ArticleRecommendationList').should('exist');
            cy.getByTestId('AddCommentForm').scrollIntoView();
            cy.addComment('comment text');
            cy.getByTestId('CommentCard.Content').should('have.length', 1);
        });
    });

    describe('Работает на стабах (фикстурах)', () => {
        it('и ставит оценку', () => {
            cy.intercept('GET', '**/articles/*', {
                fixture: 'article-details.json',
            });
            cy.getByTestId('ArticleRecommendationList').should('exist');
            cy.getByTestId('RatingCard').scrollIntoView();
            cy.setRating(4, 'feedback');
            cy.get('[data-selected=true]').should('have.length', 4);
        });
    });
});
