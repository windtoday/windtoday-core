'use strict'

const { chain, toUpper, flow } = require('lodash')
const strmatch = require('str-match')()

const {
  regex: regexBoardSize,
  regexCleanOutput
} = require('../../../identify/board/size')

const removeSpaces = require('../../../util/remove-spaces')

const hasBoardSize = item => !!item['board size']

const getBoardSize = flow([
  removeSpaces,
  toUpper
])

function prettyBoardSize (item) {
  const {title} = item
  if (!hasBoardSize(item)) return title
  const size = strmatch(title, regexBoardSize)

  return chain(title)
    .replace(size.match, getBoardSize(size.match))
    .replace(regexCleanOutput, '')
    .value()
}

module.exports = prettyBoardSize
