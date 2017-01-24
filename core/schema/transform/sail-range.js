'use strict'

const {inRange, lt, gt, eq} = require('lodash')

function isRange (size, min, max) {
  return inRange(size, min, max) || eq(size, max)
}

function sailRange (size) {
  if (lt(size, 4.6)) return '< 4.6m²'
  if (isRange(size, 4.6, 4.9)) return '4.6m² to 4.9m²'
  if (isRange(size, 5.0, 5.9)) return '5.0m² to 5.9m²'
  if (isRange(size, 6.0, 6.9)) return '6.0m² to 6.9m²'
  if (isRange(size, 7.0, 7.9)) return '7.0m² to 7.9m²'
  if (isRange(size, 8.0, 9.0)) return '8.0m² to 9.0m²'
  return '> 9.0m²'
}

module.exports = sailRange
