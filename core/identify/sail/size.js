'use strict'

const { flow, replace, toNumber } = require('lodash')
const createStrMatch = require('str-match')

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

function response (data, output) {
  return { data, output }
}

const normalizeSailSizeDoubleSimple = flow([
  (str) => replace(str, REGEX_SAIL_SIZE_DOUBLE_DELIMITER, '.'),
  (str) => replace(str, REGEX_SAIL_SIZE_SINGLE_DELIMITER, '.0'),
  toNumber
])

function createSailSizeDoubleSimple (strmatch) {
  function sailSizeDoubleSimple (str) {
    let size = strmatch(str, REGEX_SAIL_SIZE_DOUBLE_SIMPLE)
    if (!size.test) return
    return response(normalizeSailSizeDoubleSimple(size.match), size.output)
  }

  return sailSizeDoubleSimple
}

const normalizeSailSizeSingle = flow([
  (str) => replace(str, REGEX_SAIL_SIZE_DELIMITER, ''),
  (str) => replace(str, REGEX_SAIL_SIZE_DOUBLE_DELIMITER, '.'),
  (str) => replace(str, REGEX_SAIL_SIZE_SINGLE_DELIMITER, '.0'),
  toNumber
])

function createSailSizeSingle (strmatch) {
  function sailSizeSingle (str) {
    let size = strmatch(str, REGEX_SAIL_SIZE_SINGLE)
    if (!size.test) return
    return response(normalizeSailSizeSingle(size.match), size.output)
  }

  return sailSizeSingle
}

function create (opts) {
  const strmatch = createStrMatch(opts)
  const sailSizeDoubleSimple = createSailSizeDoubleSimple(strmatch)
  const sailSizeSingle = createSailSizeSingle(strmatch)

  return function (str) {
    return sailSizeDoubleSimple(str) ||
           sailSizeSingle(str) ||
           response(undefined, str)
  }
}

module.exports = create()
module.exports.create = create
