'use strict'

const { flow, replace, toNumber } = require('lodash')
const strmatch = require('str-match')

const REGEX_BOARD_LITRES_WITH_SUFFIX = /[0-9]{2,3}[ ]?l/
const REGEX_BOARD_LITRES_SUFFIX = /l/

const normalize = flow([
  (str) => replace(str, REGEX_BOARD_LITRES_SUFFIX, ''),
  toNumber
])

function boardSize (str) {
  let size = strmatch(str, REGEX_BOARD_LITRES_WITH_SUFFIX)
  if (!size.test) return
  return {data: normalize(size.match), output: size.output}
}

module.exports = boardSize
