'use strict'

const { toNumber, first, replace } = require('lodash')

const REGEX_MAST_SIZE_LETTER = /\d{1}m/i
const REGEX_MAST_SIZE_LETTER_SYMBOL = /m/i

const REGEX_MAST_SIZE_NUMBER = /\d{3}/

function letter (str) {
  let size = first(str.match(REGEX_MAST_SIZE_LETTER))
  if (!size) return

  size = replace(size, REGEX_MAST_SIZE_LETTER_SYMBOL, '00')
  return toNumber(size)
}

function number (str) {
  let size = first(str.match(REGEX_MAST_SIZE_NUMBER))
  return size && toNumber(size)
}

function size (str) {
  return letter(str) || number(str)
}

module.exports = size
