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
var priceRegex = /[0-9]+[ ]?[€eE]/
var whitespaceRegex = /\s/g

function extractPrice (str) {
  var result = lodash.first(str.match(priceRegex))
  return result && result.replace(whitespaceRegex, '')
}

module.exports = extractPrice
