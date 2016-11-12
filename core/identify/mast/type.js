
'use strict'

const strmatch = require('str-match')
const { toLower, flow } = require('lodash')
const REGEX_MAST_DIAMETER = /\b[sr]dm\b/i

const normalize = flow([
  toLower
])

function response (data, output) {
  return { data, output }
}

function type (str) {
  const type = strmatch(str, REGEX_MAST_DIAMETER)
  if (!type.test) return response(undefined, str)
  return response(normalize(type.match), type.output)
}

module.exports = type
