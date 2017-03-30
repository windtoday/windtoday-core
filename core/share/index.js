'use strict'

const composeMessage = require('./compose-message')
const createShare = require('./create-share')
const getOffers = require('./get-offers')

module.exports = createShare(composeMessage, getOffers)
