'use strict'

const {isString} = require('lodash')
const isUrl = require('./is-url')
const isTitle = (str) => isString(str) && !isUrl(str)

module.exports = isTitle
