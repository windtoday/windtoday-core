'use strict'

const { replace, first } = require('lodash')

const REGEX_BOOM_SIZE = /\d{3}( - |[-/ ])\d{3}/
const REGEX_BOOM_SEPARATOR = / - |[-/ ]/g

const REGEX_PRICE = RegExp(require('../price').regex, 'g')
const REGEX_YEAR = RegExp(require('../year').regex, 'g')

function size (str) {
  str = replace(str, REGEX_PRICE, '')
  str = replace(str, REGEX_YEAR, '')
  // str = replace(str, ' ', '')

  let size = first(str.match(REGEX_BOOM_SIZE))

  if (!size) return

  size = replace(size, REGEX_BOOM_SEPARATOR, '/')

  return size
}

module.exports = size
