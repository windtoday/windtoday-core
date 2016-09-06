'use strict'

const { toNumber, replace, first } = require('lodash')

var REGEX_BOARD_LITRES = /[0-9]{2,3}/

var REGEX_BOARD_LITRES_WITH_SUFFIX = /[0-9]{2,3}[ ]?l/

var REGEX_BOARD_LITRES_SUFFIX = /l/

function boardLitres (str) {
  var litres = first(str.match(REGEX_BOARD_LITRES))
  return litres && toNumber(litres)
}

function boardLitresSuffix (str) {
  var litres = first(str.match(REGEX_BOARD_LITRES_WITH_SUFFIX))
  if (!litres) return false
  litres = replace(litres, REGEX_BOARD_LITRES_SUFFIX, '')
  return litres && toNumber(litres)
}

function litres (str) {
  return boardLitresSuffix(str) || boardLitres(str)
}

module.exports = litres
