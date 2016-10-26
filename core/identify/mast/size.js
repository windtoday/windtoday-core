'use strict'

const { toNumber, first, replace } = require('lodash')

/**
 * Detect mast size with symbol
 * @example
 * 4m → 400
 */
const REGEX_MAST_SIZE = /\d{1}m/i
const REGEX_MAST_SIZE_SYMBOL = /m/i

function sizeSymbol (str) {
  let size = first(str.match(REGEX_MAST_SIZE))
  if (!size) return

  size = replace(size, REGEX_MAST_SIZE_SYMBOL, '00')
  return toNumber(size)
}

/**
 * Detect mast size
 * @example
 * 400 → 400
 */
const REGEX_MAST_SIZE_NUMBER = /\d{3}/

function sizeNumber (str) {
  let size = first(str.match(REGEX_MAST_SIZE_NUMBER))
  return size && toNumber(size)
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

function sizeSeparator (str) {
  let size = first(str.match(REGEX_SAIL_SIZE_WITH_SEPARATOR))
  if (!size) return

  size = replace(size, REGEX_SAIL_SIZE_SEPARATOR, '')
  while (size.length < 3) size += '0'

  return size && toNumber(size)
}

function size (str) {
  return sizeSeparator(str) || sizeNumber(str) || sizeSymbol(str)
}

module.exports = size
