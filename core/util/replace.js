'use strict'

const mem = require('mem')
const { replace } = require('lodash')

function _replace (str, pattern, replacement) {
  pattern.toJSON = pattern.toString
  return replace(str, pattern, replacement)
}

module.exports = mem(_replace)
