'use strict'

var lodash = require('lodash')

/**
 * Integer price value with optional euro symbol
 * @example
 * 80e
 * 150E
 * 200€
 * @type {RegExp}
 */
var priceRegex = /[0-9]+[€eE]/

function extractPrice (str) {
  return lodash.first(str.match(priceRegex))
}

module.exports = extractPrice
