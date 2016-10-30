'use strict'

const { toNumber, first } = require('lodash')

/**
 * Detect year of 4 digits in [2000-2999] range.
 * @example 2013
 */
const REGEX_YEAR = /2[0-9]{3}/

function year (str) {
  var year = first(str.match(REGEX_YEAR))
  return year && toNumber(year)
}

year.regex = REGEX_YEAR

module.exports = year
