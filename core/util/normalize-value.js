'use strict'

const {findLastIndex, isNaN, eq, gte} = require('lodash')
const {abs} = Math
const {POSITIVE_INFINITY} = Number

/**
 * Normalizes a value according to the specified steps, using log norm2 formula.
 *
 * @param {number} value The scalar value
 * @param {array}  steps The array of step objects, each one containing a `value` and `norm` properties
 *
 * @return {number} The normalized value
 */
function normalizeValue (value, steps) {
  const index = findLastIndex(steps, step => step.value <= value)

  // Out of bounds?
  if (eq(index, -1)) return steps[0].norm
  if (gte(index, steps.length - 1)) return steps[steps.length - 1].norm

  const stepLow = steps[index]
  const stepHigh = steps[index + 1]

  // LOG_NORM2 formula
  const normalizedValue =
    stepLow.norm +
    (stepHigh.norm - stepLow.norm) *
    (value - stepLow.value) /
    (stepHigh.value - stepLow.value)

  // Invalid calculation?
  if (isNaN(normalizedValue) || eq(abs(normalizedValue), POSITIVE_INFINITY)) {
    throw new Error('Invalid value or steps')
  }

  return normalizedValue
}

module.exports = normalizeValue
