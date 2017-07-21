'use strict'

const { flow, replace, toNumber } = require('lodash')
const strmatch = require('str-match')()

/**
 * 50e
 * 50E
 * 50€
 */
const REGEX_PRICE_AT_END = /([0-9]+[,.'])*[0-9]+[ ]?[€eE](\W|\s|$)/

/**
 * 135eu
 * 135 eu
 * 135 euros
 * 135Euros
 * 135 Euros
 * 135euros
 * @type {[type]}
 */
const REGEX_PRICE_AT_END_WORD = /([0-9]+[,.'])*[0-9]+[ ]?([eE]u(ros)?)/

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
const REGEX_CURRENCY_SYMBOL = /[ ]?[€eE]/

const REGEX_CURRENCY_SYMBOL_WORD = /[ ]?([eE]u(ros)?)/

const REGEX_NON_NUMBER = /\D/

function response (price, output) {
  return { data: { price }, output }
}

const normalize = flow([
  str => replace(str, REGEX_CURRENCY_SYMBOL_WORD, ''),
  str => replace(str, REGEX_CURRENCY_SYMBOL, ''),
  str => replace(str, REGEX_NON_NUMBER, ''),
  toNumber
])

function priceAtEnd (str) {
  let price = strmatch(str, REGEX_PRICE_AT_END)
  if (!price.test) return
  return response(normalize(price.match), price.output)
}

function priceAtEndWord (str) {
  let price = strmatch(str, REGEX_PRICE_AT_END_WORD)
  if (!price.test) return
  return response(normalize(price.match), price.output)
}

function priceAtBegin (str) {
  let price = strmatch(str, REGEX_PRICE_AT_BEGIN)
  if (!price.test) return
  return response(normalize(price.match), price.output)
}

function price (str) {
  return (
    priceAtBegin(str) ||
    priceAtEnd(str) ||
    priceAtEndWord(str) ||
    response(undefined, str)
  )
}

module.exports = price
