'use strict'

const { toNumber } = require('lodash')
const strmatch = require('str-match')
// TODO: pass options to strmatch to decide how to apply the clean regex
// That's useful for example for clean global results instead of only first.

/**
 * Detect year of 4 digits in [2000-2999] range.
 * @example 2013
 */
const REGEX_YEAR = /2[0-9]{3}/

function response (year, output) {
  return { data: {year}, output }
}

function year (str) {
  const year = strmatch(str, REGEX_YEAR)
  if (!year.test) return response(undefined, str)
  year.match = toNumber(year.match)
  return response(year.match, year.output)
}

year.regex = REGEX_YEAR

module.exports = year
