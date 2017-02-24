'use strict'

const {includes} = require('lodash')

const VALID_CONDITIONS = [
  'new',
  'used'
]

function isValidCondition (value) {
  return includes(VALID_CONDITIONS, value)
}

module.exports = isValidCondition
