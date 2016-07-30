'use strict'

var lodash = require('lodash')

var yearRegex = /2[0-9]{3}/

function extractYear (str) {
  return lodash.first(str.match(yearRegex))
}

module.exports = extractYear
