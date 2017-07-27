'use strict'

const { toNumber, flow } = require('lodash')
const strmatch = require('str-match')()

const REGEX_BOOM_SIZE = /\d{3}/

const response = (data, output) => ({ data, output })

const normalize = flow([
  toNumber
])

function size (str) {
  const size = strmatch(str, REGEX_BOOM_SIZE)
  if (!size.test) return response(undefined, str)
  return response(normalize(size.match), size.output)
}

module.exports = size
