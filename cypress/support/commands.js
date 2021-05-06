// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
Cypress.Commands.add('itemRecommend', (query, limit, enableInfo) => {
    cy.request({
        url: '/api/similar',
        qs: {
            q: query,
            limit: limit,
            info: enableInfo
        }
    })
})