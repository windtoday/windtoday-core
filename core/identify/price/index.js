'use strict'

const { flow, replace, toNumber } = require('lodash')
const strmatch = require('str-match')()

/**
 * Detect numeric price with currency at end.
 * @example
 * 80e → 80€
 * 150E → 150€
 * 200€ → 200€
 * 1.100e → 1100€
 * 1,100e → 1100€
 * @type {RegExp}
 */
const REGEX_PRICE_AT_END = /([0-9]+[,.'])*[0-9]+[ ]?[€eE](\s|$)/

/**
 * Detect numeric price with currency at begin
 * @example
 * €450 → 450€
 */
const REGEX_PRICE_AT_BEGIN = /€[0-9]+/

const REGEX_PRICE = RegExp(REGEX_PRICE_AT_END.source + '|' + REGEX_PRICE_AT_BEGIN.source)

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

function response (price, output) {
  return { data: {price}, output }
}

const normalize = flow([
  (str) => replace(str, REGEX_CURRENCY_SYMBOL, ''),
  (str) => replace(str, REGEX_DECIMAL_SYMBOL, ''),
  toNumber
])

function price (str) {
  const price = strmatch(str, REGEX_PRICE)
  if (!price.test) return response(undefined, str)
  return response(normalize(price.match), price.output)
}

price.regex = REGEX_PRICE

module.exports = price
