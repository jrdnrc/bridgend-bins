const
    requestType = input => input.requestEnvelope.request.type,
    intentName  = input => input.requestEnvelope.request.intent.name,
    isIntentRequest = input => requestType(input) === 'IntentRequest'

module.exports = { requestType, intentName, isIntentRequest }
