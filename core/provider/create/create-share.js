'use strict'

const createAddBuffer = require('../../share/create-add-buffer')
const composeMessage = require('../../share/compose-message')
const isOffer = require('../../share/is-offer')

module.exports = createAddBuffer(isOffer, composeMessage)
