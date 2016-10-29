'use strict'

const { toNumber, first } = require('lodash')

const REGEX_FINS_SIZE = /\b\d{1,2}\b/i

function size (str) {
  let size = first(str.match(REGEX_FINS_SIZE))
  return size && toNumber(size)
}

module.exports = size
