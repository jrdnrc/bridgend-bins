'use strict'

require('dotenv').config()

const { getCollectionDetails } = require('./../lib/scrape')
const moment = require('moment')
require('chai').should()

describe('getCollectionDetails', function () {
    it('should return an array of collections', async function () {
        const collection = await getCollectionDetails()

        collection.should.be.an('array')
        collection.should.have.lengthOf(3)
    })

    it('should contain 3 days', async function () {
        const collections = await getCollectionDetails()

        collections.forEach(c => moment.isMoment(c.nextService).should.be.true)
    })
})
