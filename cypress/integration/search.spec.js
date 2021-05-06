/// <reference types="cypress" />
context('Search Recommends', () => {
    const dataFeeder = require('../fixtures/dataFeeder')

    dataFeeder.limit.forEach((limit) => {
        it(`check limit ${limit} - Search recommends for ${dataFeeder.searchTerm}`, () => {
            cy.itemRecommend(dataFeeder.searchTerm, limit, 0).then(response => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('Similar')
                expect(response.body.Similar.Results).lengthOf(limit)
            })
        })
    })

    it(`Info Flag Disabled - Search recommends for ${dataFeeder.searchTerm}`, () => {
        cy.itemRecommend(dataFeeder.searchTerm, 1, 0).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('Similar')
        })
    })

    it(`Info Flag enabled - Search recommends for ${dataFeeder.searchTerm}`, () => {
        cy.itemRecommend(dataFeeder.searchTerm, 1, 1).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.Similar).to.have.property('Info')
            expect(response.body.Similar).to.have.property('Results')
            expect(response.body.Similar.Info[0]).to.have.property('wTeaser')
            expect(response.body.Similar.Info[0]).to.have.property('wUrl')
            expect(response.body.Similar.Info[0]).to.have.property('yUrl')
            expect(response.body.Similar.Info[0]).to.have.property('yID')
            expect(response.body.Similar.Info[0].wUrl).contains("http")
            expect(response.body.Similar.Results).to.have.length(1)

        })
    })
})