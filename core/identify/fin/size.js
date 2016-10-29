'use strict'

const { replace, toNumber, first } = require('lodash')

const REGEX_FINS_SIZE = /\d{2}/
const REGEX_PRICE = require('../price').regex

function size (str) {
  str = replace(str, REGEX_PRICE, '')
  let size = first(str.match(REGEX_FINS_SIZE))
  return size && toNumber(size)
}

module.exports = size
