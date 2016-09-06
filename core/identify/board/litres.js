'use strict'

const { toNumber, first } = require('lodash')

var REGEX_BOARD_LITRES = /[0-9]{2,3}/

function boardLitres (str) {
  var litres = first(str.match(REGEX_BOARD_LITRES))
  return litres && toNumber(litres)
}

module.exports = boardLitres
