'use strict'

const { first, flow, replace, toNumber } = require('lodash')

/**
 * Detect numeric price with currency symbol.
 * @example
 * 80e → 80€
 * 150E → 150€
 * 200€ → 200€
 * 1.100e → 1100€
 * 1,100e → 1100€
 * @type {RegExp}
 */
const REGEX_PRICE = /([0-9]+[,.'])*[0-9]+[ ]?[€eE](\s|$)/

/**
 * Detect Currency Symbol
 * @example 80e → €
 */
const REGEX_CURRENCY_SYMBOL = /[€eE]/

/**
 * Detect decimal symbol
 * @example 1.100 → .
 * @example 1,100 → ,
 */
const REGEX_DECIMAL_SYMBOL = /[,.']/

const normalize = flow([
  (str) => replace(str, REGEX_CURRENCY_SYMBOL, ''),
  (str) => replace(str, REGEX_DECIMAL_SYMBOL, ''),
  toNumber
])

function price (str) {
  const price = first(str.match(REGEX_PRICE))
  return price && normalize(price)
}

price.regex = REGEX_PRICE

module.exports = price
