'use strict'

const { toNumber, first } = require('lodash')

const match = require('../util/match')

/**
 * Detect year of 4 digits in [2000-2999] range.
 * @example 2013
 */
const REGEX_YEAR = /2[0-9]{3}/

function year (str) {
  var year = first(match(str, REGEX_YEAR))
  return year && toNumber(year)
}

module.exports = year
