'use strict'

const { first, flow, replace, toNumber } = require('lodash')

/**
 * Detect numeric price with currency symbol.
 * @example
 * 80e → 80€
 * 150E → 150€
 * 200€ → 200€
 * @type {RegExp}
 */
const REGEX_PRICE = /[0-9]+[ ]?[€eE](\s|$)/

/**
 * Detect Currency Symbol
 * @example 80e → €
 */
const REGEX_CURRENCY_SYMBOL = /[€eE]/

const normalize = flow([
  (str) => replace(str, REGEX_CURRENCY_SYMBOL, '')
])

function price (str) {
  const price = first(str.match(REGEX_PRICE))
  // NOTE: lodash.toNumber remove whitespace
  return price && toNumber(normalize(price))
}

module.exports = price
