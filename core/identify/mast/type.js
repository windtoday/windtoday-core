'use strict'

const { toLower, first } = require('lodash')
const REGEX_MAST_TYPE = /\b[sr]dm\b/i

function type (str) {
  let type = first(str.match(REGEX_MAST_TYPE))
  return type && toLower(type)
}

module.exports = type
