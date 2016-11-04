'use strict'

const { first } = require('lodash')

const REGEX_BOOM_TYPE = /carbon/i

function type (str) {
  const type = first(str.match(REGEX_BOOM_TYPE))
  return type
}

module.exports = type
