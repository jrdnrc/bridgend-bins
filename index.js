'use strict'

require('dotenv').config()

const { getCollectionDetails } = require('./scrape')

getCollectionDetails(console.log)
