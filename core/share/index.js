'use strict'

const composeMessge = require('./compose-message.js')
const createShare = require('./create-share')
const createAddBuffer = require('./create-add-buffer')

const addBuffer = createAddBuffer(composeMessge)
module.exports = createShare(addBuffer)
