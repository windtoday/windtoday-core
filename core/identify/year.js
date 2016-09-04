'use strict'

const { toNumber, first } = require('lodash')
var REGEX_YEAR = /2[0-9]{3}/

function extractYear (str) {
  var year = first(str.match(REGEX_YEAR))
  return year && toNumber(year)
}

module.exports = extractYear
