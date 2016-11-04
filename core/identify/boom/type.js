'use strict'

const { replace, first } = require('lodash')

const REGEX_BOOM_TYPE = /carbon|aluminio|aluminum/i

function type (str) {
  const type = first(str.match(REGEX_BOOM_TYPE))
  return type
}

module.exports = type
