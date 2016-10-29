'use strict'

const { toNumber, replace, first } = require('lodash')

const REGEX_BOARD_LITRES_WITH_SUFFIX = /[0-9]{2,3}[ ]?l/
const REGEX_BOARD_LITRES_SUFFIX = /l/

function litres (str) {
  let litres = first(str.match(REGEX_BOARD_LITRES_WITH_SUFFIX))
  if (!litres) return

  litres = replace(litres, REGEX_BOARD_LITRES_SUFFIX, '')
  return litres && toNumber(litres)
}

module.exports = litres
