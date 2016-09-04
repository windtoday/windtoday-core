'use strict'

const { toNumber, first } = require('lodash')
const match = require('../../util/match')

var REGEX_BOARD_LITRES = /[0-9]{2,3}/

function boardLitres (str) {
  var litres = first(match(str, REGEX_BOARD_LITRES))
  return litres && toNumber(litres)
}

module.exports = boardLitres
