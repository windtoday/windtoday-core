'use strict'

const { chain, flow } = require('lodash')
const strmatch = require('str-match')()

const {
  regex: regexBoardSize,
  regexCleanOutput
} = require('../../../identify/board/size')

const removeSpaces = require('../../../util/remove-spaces')

const getBoardSize = flow([removeSpaces])

module.exports = (item) => {
  const { title, 'board size': boardSize } = item
  if (!boardSize) return title

  const size = strmatch(title, regexBoardSize)
  if (!size.test) return title

  return chain(title)
    .replace(size.match, getBoardSize(size.match))
    .replace(regexCleanOutput, '')
    .value()
}
