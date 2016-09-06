'use strict'

const { replace, toNumber, first, trim } = require('lodash')

/**
 * Detect sail size in text with spaces
 * @example Evo 6 7,8 → 7,8
 * @example Evo 6 7 8 → 7,8
 * @example Evo 6 7'8 → 7,8
 * @example Evo 6 7,8 → 7,8
 */
const REGEX_SAIL_SIZE_DOUBLE = /[ ]?\d+[ ,.']\d+/

/**
 * Detect double sail size
 * @example Severne 7,8 → 7,8
 * @example Severne 7.8 → 7.8
 * @example Severne 7'8 → 7'8
 * @example Severne 7 8 → 7 8
 */
const REGEX_SAIL_SIZE_DOUBLE_SIMPLE = /\d+[,.']\d+/

/**
 * Normalize double delimiter
 * @example 7 8 → 7.8
 * @example 7'8 → 7.8
 * @example 7,8 → 7.8
 */
const REGEX_SAIL_SIZE_DOUBLE_DELIMITER = /[ ,']/

/**
 * Detect single sail size values
 * @example Severne 7m → 7m
 * @example Severne 7 m → 7 m
 */
const REGEX_SAIL_SIZE_SINGLE = /\d+[ ]?m/

/**
 * Normalize single sail size delimiter
 * @example 7m → 7.0
 * @example 7 m → 7.0
 */
const REGEX_SAIL_SIZE_SINGLE_DELIMITER = /[ ]?m/

function sailSizeDoubleSimple (str) {
  let size = first(str.match(REGEX_SAIL_SIZE_DOUBLE_SIMPLE))
  if (!size) return false

  size = replace(size, REGEX_SAIL_SIZE_DOUBLE_DELIMITER, '.')
  return size && toNumber(size)
}

function sailSizeDouble (str) {
  let size = first(str.match(REGEX_SAIL_SIZE_DOUBLE))
  if (!size) return false

  size = trim(size)
  size = replace(size, REGEX_SAIL_SIZE_DOUBLE_DELIMITER, '.')
  return size && toNumber(size)
}

function sailSizeSingle (str) {
  let size = first(str.match(REGEX_SAIL_SIZE_SINGLE))
  if (!size) return false

  size = replace(size, REGEX_SAIL_SIZE_SINGLE_DELIMITER, '.0')
  return size && toNumber(size)
}

function sailSize (str) {
  return sailSizeDoubleSimple(str) || sailSizeSingle(str) || sailSizeDouble(str)
}

module.exports = sailSize
