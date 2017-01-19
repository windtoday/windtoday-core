'use strict'

const { flow, replace, toNumber } = require('lodash')
const strmatch = require('str-match')()

const REGEX_BOARD_LITRES_WITH_SUFFIX = /[0-9]{2,3}[ ]?l/
const REGEX_BOARD_LITRES_SUFFIX = /l/
const REGEX_BOARD_LITRES_SUFFIX_OUTPUT = /itr[eo]s/

const normalizePrice = flow([
  (str) => replace(str, REGEX_BOARD_LITRES_SUFFIX, ''),
  toNumber
])

const normalizeOutput = flow([
  (str) => replace(str, REGEX_BOARD_LITRES_SUFFIX_OUTPUT, '')
])

function boardSize (str) {
  let size = strmatch(str, REGEX_BOARD_LITRES_WITH_SUFFIX)
  let output = str
  let data

  if (!size.test) return {data, output}

  data = normalizePrice(size.match)
  output = normalizeOutput(size.output)
  return {data, output}
}

module.exports = boardSize
