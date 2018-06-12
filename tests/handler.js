'use strict'

const
    alexaTest = require('alexa-skill-test-framework'),
    t = require('./../lib/lang').en

alexaTest.initialize(
    require('./../index'),
    'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',
    'amzn1.ask.account.VOID',
)

describe('Bridgend Bins Skill', function () {
    describe('LaunchRequest', function () {
        alexaTest.test([
            {
                request: alexaTest.getLaunchRequest(),
                says: t.SKILL_NAME,
                repromptsNothing: true,
                shouldEndSession: true,
            }
        ])
    })

    describe('NextCollectionHandler', function () {
        alexaTest.test([
            {
                request: alexaTest.getIntentRequest('NextCollectionIntent'),
                says: t.NEXT_COLLECTION,
                shouldEndSession: true,
            }
        ])
    })
})
