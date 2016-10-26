'use strict'

const { first, replace, toNumber } = require('lodash')

const REGEX_MAST_CARBON = /\d{2,3}[%c]/i
const REGEX_MAST_CARBON_SYMBOL = /[%c]/

function carbon (str) {
  let carbon = first(str.match(REGEX_MAST_CARBON))
  if (!carbon) return

  carbon = replace(carbon, REGEX_MAST_CARBON_SYMBOL, '')
  return toNumber(carbon)
}

module.exports = carbon
