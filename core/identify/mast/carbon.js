'use strict'

const { flow, replace, toNumber } = require('lodash')
const strmatch = require('str-match')()

const REGEX_MAST_CARBON_SYMBOL_AT_BEGIN = /spx.?\d{2,3}|flx.?\d{2,3}|[%cx]\d{2,3}/
const REGEX_MAST_CARBON_SYMBOL_AT_END = /[^\d{1}]\d{2}[%c]|100[%c]/
const REGEX_MAST_CARBON_SYMBOL = /[%cx]|spx|flx/i

const REGEX_MAST_CARBON = RegExp(
  REGEX_MAST_CARBON_SYMBOL_AT_BEGIN.source +
    '|' +
    REGEX_MAST_CARBON_SYMBOL_AT_END.source,
  'i'
)

const normalize = flow([
  str => replace(str, REGEX_MAST_CARBON_SYMBOL, ''),
  toNumber
])

function response (data, output) {
  return { data, output }
}

function carbon (str) {
  const carbon = strmatch(str, REGEX_MAST_CARBON)
  if (!carbon.test) return response(undefined, str)
  return response(normalize(carbon.match), carbon.output)
}

module.exports = carbon
