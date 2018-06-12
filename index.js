'use strict'

require('dotenv').config()

const  Alexa                    = require('ask-sdk')

module.exports = {
    handler: Alexa.SkillBuilders.custom().addRequestHandlers(...require('./lib/handlers')).lambda()
    /*handler: async (event, context) => {
        if (!skill) {
            skill = Alexa.SkillBuilders.custom()
                .addRequestHandlers(require('./lib/handlers'))
                .create()
        }

        return skill.invoke(event, context)

        const alexa = Alexa.handler(event, context)

        alexa.appId = process.env.APP_ID
        alexa.resources = languageStrings
        alexa.registerHandlers(handlers)
        alexa.execute()
    }*/
}
