'use strict'

const { replace, flow } = require('lodash')
const strmatch = require('str-match')()

const REGEX_BOOM_SIZE = /\d{3}( - |[-/ ])\d{3}/
const REGEX_BOOM_SEPARATOR = / - |[-/ ]/g

function response (data, output) {
  return { data, output }
}

const normalize = flow([str => replace(str, REGEX_BOOM_SEPARATOR, '/')])

function size (str) {
  const size = strmatch(str, REGEX_BOOM_SIZE)
  if (!size.test) return response(undefined, str)
  return response(normalize(size.match), size.output)
}

module.exports = size
