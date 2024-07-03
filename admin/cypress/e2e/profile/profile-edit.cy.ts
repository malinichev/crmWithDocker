let profileId = '';

describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${profileId}`);
        });
    });

    afterEach(() => {
        cy.restProfile(profileId);
        profileId = '';
    });
    it('И профиль успешно загружается', () => {
        cy.getByTestId('ProfileCard.FirstName').should('have.value', 'test');
    });
    it('И редактируем его', () => {
        const newFirstName = 'new';
        const newLastName = 'lastName';
        cy.updateProfile(newFirstName, newLastName);
        cy.getByTestId('ProfileCard.FirstName').should(
            'have.value',
            newFirstName,
        );
        cy.getByTestId('ProfileCard.LastName').should(
            'have.value',
            newLastName,
        );
    });
});
