'use strict'

var lodash = require('lodash')
var REGEX_YEAR = /2[0-9]{3}/

function extractYear (str) {
  return lodash.first(str.match(REGEX_YEAR))
}

module.exports = extractYear
