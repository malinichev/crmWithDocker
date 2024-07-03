export const setRating = (
    rating: number = 4,
    feedback: string = 'feedback',
) => {
    cy.getByTestId(`StarRating.${rating}`).click();
    cy.getByTestId('RatingCard.Input').type(feedback);
    cy.getByTestId('RatingCard.Send').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRating(raiting?: number, feedback?: string): Chainable<void>;
        }
    }
}
