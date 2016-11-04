
'use strict'

const { toLower, first } = require('lodash')
const REGEX_MAST_DIAMETER = /\b[sr]dm\b/i

function type (str) {
  let type = first(str.match(REGEX_MAST_DIAMETER))
  return type && toLower(type)
}

module.exports = type
