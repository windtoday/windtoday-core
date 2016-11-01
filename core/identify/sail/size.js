'use strict'

const { replace, toNumber, first } = require('lodash')
const REGEX_YEAR = RegExp(require('../year').regex, 'g')
const REGEX_PRICE = RegExp(require('../price').regex, 'g')

/**
 * Detect double sail size with separator variations
 * Dont' end with `m` symbol.
 *
 * @example Severne 7 → 7.0
 * @example Severne 7  → 7.0
 * @example Severne 7.8 → 7.8
 * @example Severne 7.8  → 7.8
 * @example Severne 10.8 → 10.8
 * @example Severne 10.8  → 10.8
 */
const REGEX_SAIL_SIZE_DOUBLE_SIMPLE = /\d{1,2}[,.'´]\d/

/**
 * Normalize double delimiter
 * @example 7 8 → 7.8
 * @example 7'8 → 7.8
 * @example 7´8 → 7.8
 * @example 7,8 → 7.8
 * @example 7.8 → 7.8
 */
const REGEX_SAIL_SIZE_DOUBLE_DELIMITER = /[ ,.'´]/

/**
 * Detect single sail size values with separator variations
 * Need to end with `m` symbol.
 *
 * @example Severne 7m → 7.0
 * @example Severne 7 m → 7.0
 * @example Severne 7.8m → 7.8
 * @example Severne 7.8 m → 7.8
 * @example Severne 10.8m → 10.8
 * @example Severne 10.8 m → 10.8
 */
const REGEX_SAIL_SIZE_SINGLE = /(\d{1,2}[ ,.'´])*\d{1,2}[ ,.'´]?m?/

/**
 * Normalize single sail size delimiter
 * @example 7m → 7.0
 * @example 7 m → 7.0
 */
const REGEX_SAIL_SIZE_SINGLE_DELIMITER = /[ ]?m/

const REGEX_SAIL_SIZE_DELIMITER = /m/

function sailSizeDoubleSimple (str) {
  let size = first(str.match(REGEX_SAIL_SIZE_DOUBLE_SIMPLE))
  if (!size) return

  size = replace(size, REGEX_SAIL_SIZE_DOUBLE_DELIMITER, '.')
  return size && toNumber(size)
}

function sailSizeSingle (str) {
  let size = first(str.match(REGEX_SAIL_SIZE_SINGLE))
  if (!size) return

  size = replace(size, REGEX_SAIL_SIZE_DELIMITER, '')
  size = replace(size, REGEX_SAIL_SIZE_DOUBLE_DELIMITER, '.')
  size = replace(size, REGEX_SAIL_SIZE_SINGLE_DELIMITER, '.0')

  return size && toNumber(size)
}

function sailSize (str) {
  str = replace(str, REGEX_YEAR, '')
  str = replace(str, REGEX_PRICE, '')
  return sailSizeDoubleSimple(str) || sailSizeSingle(str)
}

module.exports = sailSize
