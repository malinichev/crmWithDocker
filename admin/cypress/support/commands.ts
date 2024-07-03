import * as commonComands from './commands/common';
import * as profileComands from './commands/profile';
import * as articleComands from './commands/article';
import * as commentsComands from './commands/comment';
import * as ratingComands from './commands/rating';
// import { createFixture } from './util/createFixture';

Cypress.Commands.addAll(commonComands);
Cypress.Commands.addAll(profileComands);
Cypress.Commands.addAll(articleComands);
Cypress.Commands.addAll(commentsComands);
Cypress.Commands.addAll(ratingComands);
// Cypress.Commands.overwrite('intercept', (originalFn, method, url, response) => {
//     const { FIXTURE_MODE } = process.env;
//     if (FIXTURE_MODE === 'WRITE') {
//         return originalFn(method, url, createFixture);
//     }
//
//     if (FIXTURE_MODE === 'READ') {
//         // return originalFn(method, url, readFixture) ;
//     }
//     return originalFn(method, url, response);
// });

export {};
