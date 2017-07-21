'use strict'

const { toNumber, flow } = require('lodash')
const strmatch = require('str-match')()

const REGEX_FINS_SIZE = /\d{2}/

const normalize = flow([toNumber])

function response (data, output) {
  return { data, output }
}

function size (str) {
  let size = strmatch(str, REGEX_FINS_SIZE)
  if (!size.test) return response(undefined, str)
  return response(normalize(size.match), size.output)
}

module.exports = size
