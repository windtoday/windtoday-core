'use strict'

const { first } = require('lodash')
var REGEX_YEAR = /2[0-9]{3}/

function extractYear (str) {
  return first(str.match(REGEX_YEAR))
}

module.exports = extractYear
