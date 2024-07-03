import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';

export const updateProfile = (firstName: string, lastName: string) => {
    cy.getByTestId('EditableProfileHeader.EditButton').click();
    cy.getByTestId('ProfileCard.FirstName').clear().type(firstName);
    cy.getByTestId('ProfileCard.LastName').clear().type(lastName);
    cy.getByTestId('EditableProfileHeader.SaveButton').click();
};

export const restProfile = (profileId: string) => {
    return cy
        .request({
            method: 'PUT',
            headers: { Authorization: 'asdasd' },
            url: `http://localhost:8000/profile/${profileId}`,
            body: {
                id: profileId,
                firstname: 'test',
                lastname: 'user',
                age: 465,
                currency: 'RUB',
                country: 'Russia',
                city: 'Moscow',
                username: 'testuser',
                avatar: 'https://api.slingacademy.com/public/sample-users/2.png',
            },
        })
        .then(({ body }) => {
            window.localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                JSON.stringify(body),
            );
            return body;
        });
};

declare global {
    namespace Cypress {
        interface Chainable {
            restProfile(profileId: string): Chainable<void>;
            updateProfile(firstName: string, lastName: string): Chainable<void>;
        }
    }
}
