'use strict'

const { toNumber, flow, replace } = require('lodash')
const strmatch = require('str-match')()

function response (data, output) {
  return { data, output }
}

/**
 * Detect mast size with symbol
 * @example
 * 4m → 400
 */
const REGEX_MAST_SIZE = /\d{1}m/i
const REGEX_MAST_SIZE_SYMBOL = /m/i

const normalizeSizeSymbol = flow([
  str => replace(str, REGEX_MAST_SIZE_SYMBOL, '00'),
  toNumber
])

function sizeSymbol (str) {
  const size = strmatch(str, REGEX_MAST_SIZE)
  if (!size.test) return
  return response(normalizeSizeSymbol(size.match), size.output)
}

/**
 * Detect mast size
 * @example
 * 400 → 400
 */
const REGEX_MAST_SIZE_NUMBER = /\d{3}/

const normalizeSizeNumber = flow([toNumber])

function sizeNumber (str) {
  const size = strmatch(str, REGEX_MAST_SIZE_NUMBER)
  if (!size.test) return
  return response(normalizeSizeNumber(size.match), size.output)
}

/**
 * Detect mast size with separator
 * @example
 * 3.7 → 370
 * 3'7 → 370
 * 3,7 → 370
 * 3,7m → 370
 */
const REGEX_SAIL_SIZE_WITH_SEPARATOR = /\d{1,2}[,.'´]\d/
const REGEX_SAIL_SIZE_SEPARATOR = /[,.'´]/

const normalizeSizeSeparator = flow([
  str => replace(str, REGEX_SAIL_SIZE_SEPARATOR, ''),
  str => {
    while (str.length < 3) str += '0'
    return str
  },
  toNumber
])

function sizeSeparator (str) {
  const size = strmatch(str, REGEX_SAIL_SIZE_WITH_SEPARATOR)
  if (!size.test) return
  return response(normalizeSizeSeparator(size.match), size.output)
}

function size (str) {
  return (
    sizeSeparator(str) ||
    sizeNumber(str) ||
    sizeSymbol(str) ||
    response(undefined, str)
  )
}

module.exports = size
