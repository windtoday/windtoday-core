'use strict'

var lodash = require('lodash')

/**
 * Integer price value with optional euro symbol
 * @example
 * 80e → 80€
 * 150E → 150€
 * 200€ → 200€
 * @type {RegExp}
 */

var REGEX_PRICE = /[0-9]+[ ]?[€eE]/
var REGEX_WHITESPACE = /\s/g
var REGEX_SYMBOL = /[€eE]/

function getFirstMatch (str, regex) {
  return lodash.first(str.match(regex))
}

function normalizePrice (str) {
  return str
    .replace(REGEX_WHITESPACE, '')
    .replace(REGEX_SYMBOL, '')
}

function extractPrice (str) {
  var price = getFirstMatch(str, REGEX_PRICE)
  return price && normalizePrice(price)
}

module.exports = extractPrice
