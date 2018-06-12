const { getCollectionDetails } = require('./scrape')
const { requestType, intentName, isIntentRequest } = require('./helpers')
const t = require('./lang').en

const LaunchRequestHandler = {
    canHandle: input => requestType(input) === 'LaunchRequest',
    handle: input => input.responseBuilder
        .speak(t.SKILL_NAME)
        .withSimpleCard(t.SKILL_NAME, t.SKILL_NAME)
        .getResponse(),
}

const NextCollectionHandler = {
    canHandle: input => isIntentRequest(input) && intentName(input) === 'NextCollectionIntent',

    async handle (input) {
        const c = await getCollectionDetails()

        return input.responseBuilder
            .speak(t.NEXT_COLLECTION)
            .getResponse()
    }
}

/**
 * Default Handlers
 */
const HelpIntentHandler = {
    canHandle: input => isIntentRequest(input) && intentName(input) === 'AMAZON.HelpIntent',
    handle: input => input.responseBuilder
            .speak(t.HELP_MESSAGE)
            .reprompt(t.HELP_MESSAGE)
            .withSimpleCard(t.HELP_MESSAGE, t.HELP_MESSAGE)
            .getResponse()
}

const CancelAndStopIntentHandler = {
    canHandle(input) {
        return isIntentRequest(input)
            && (intentName(input) === 'AMAZON.CancelIntent' || intentName(input) === 'AMAZON.StopIntent')
    },
    handle: input => input.responseBuilder
        .speak(t.STOP_MESSAGE)
        .withSimpleCard(t.STOP_MESSAGE, t.STOP_MESSAGE)
        .getResponse()
}

module.exports = [ LaunchRequestHandler, NextCollectionHandler, HelpIntentHandler, CancelAndStopIntentHandler ]
