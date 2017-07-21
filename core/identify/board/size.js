'use strict'

const { flow, replace, toNumber } = require('lodash')
const strmatch = require('str-match')()

const REGEX_BOARD_LITRES = /[0-9]{2,3}[ ]?l/i
const REGEX_BOARD_LITRES_PREFIX = /l/i
const REGEX_BOARD_LITRES_PREFIX_CLEAN_OUTPUT = /itr[eo]s/i

const normalizePrice = flow([
  str => replace(str, REGEX_BOARD_LITRES_PREFIX, ''),
  toNumber
])

const normalizeOutput = flow([
  str => replace(str, REGEX_BOARD_LITRES_PREFIX_CLEAN_OUTPUT, '')
])

function boardSize (str) {
  const size = strmatch(str, REGEX_BOARD_LITRES)
  let output = str
  let data

  if (!size.test) return { data, output }

  data = normalizePrice(size.match)
  output = normalizeOutput(size.output)
  return { data, output }
}

boardSize.regex = REGEX_BOARD_LITRES
boardSize.regexCleanOutput = REGEX_BOARD_LITRES_PREFIX_CLEAN_OUTPUT

module.exports = boardSize
