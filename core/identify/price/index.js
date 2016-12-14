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
const REGEX_PRICE_AT_END = /([0-9]+[,.'])*[0-9]+[ ]?[€eE](\W|\s|$)/

/**
 * Detect numeric price with currency at begin
 * @example
 * €450 → 450€
 */
const REGEX_PRICE_AT_BEGIN = /€[0-9]+/

/**
 * Detect Currency Symbol
 * @example 80e → €
 */
const REGEX_CURRENCY_SYMBOL = /[€eE]/

const REGEX_NON_NUMBER = /\D/

function response (price, output) {
  return { data: {price}, output }
}

const normalize = flow([
  (str) => replace(str, REGEX_CURRENCY_SYMBOL, ''),
  (str) => replace(str, REGEX_NON_NUMBER, ''),
  toNumber
])

function priceAtEnd (str) {
  let price = strmatch(str, REGEX_PRICE_AT_END)
  if (!price.test) return
  return response(normalize(price.match), price.output)
}

function priceAtBegin (str) {
  let price = strmatch(str, REGEX_PRICE_AT_BEGIN)
  if (!price.test) return
  return response(normalize(price.match), price.output)
}

function price (str) {
  return priceAtBegin(str) || priceAtEnd(str) || response(undefined, str)
}

module.exports = price
