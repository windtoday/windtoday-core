'use strict'

const { first, flow } = require('lodash')
const match = require('../util/match')
const replace = require('../util/replace')

/**
 * Detect numeric price with currency symbol.
 * @example
 * 80e → 80€
 * 150E → 150€
 * 200€ → 200€
 * @type {RegExp}
 */
const REGEX_PRICE = /[0-9]+[ ]?[€eE]/

/**
 * Remove intermediate spaces
 * @example
 * 80 e → 80e
 */
const REGEX_WHITESPACE = /\s/g

/**
 * Detect Currency Symbol
 * @example 80e → €
 */
const REGEX_CURRENCY_SYMBOL = /[€eE]/

const normalize = flow([
  (str) => replace(str, REGEX_CURRENCY_SYMBOL, ''),
  (str) => replace(str, REGEX_WHITESPACE, '')
])

function price (str) {
  const price = first(match(str, REGEX_PRICE))
  return price && normalize(price)
}

module.exports = price
