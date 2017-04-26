'use strict'

const composeMessage = require('./compose-message')
const getShareables = require('./get-shareables')
const createShare = require('./create-share')

module.exports = createShare(composeMessage, getShareables)
