'use strict'

const { first, replace, toNumber } = require('lodash')

const REGEX_MAST_CARBON_SYMBOL_AT_BEGIN = /[%cC]\d{2,3}/i
const REGEX_MAST_CARBON_SYMBOL_AT_END = /\d{2,3}[%cC]/i
const REGEX_MAST_CARBON_SYMBOL = /[%cC]/

const REGEX_MAST_CARBON = RegExp(
  REGEX_MAST_CARBON_SYMBOL_AT_BEGIN.source + '|' +
  REGEX_MAST_CARBON_SYMBOL_AT_END.source
)

function carbon (str) {
  let carbon = first(str.match(REGEX_MAST_CARBON))
  if (!carbon) return

  carbon = replace(carbon, REGEX_MAST_CARBON_SYMBOL, '')
  return toNumber(carbon)
}

module.exports = carbon
