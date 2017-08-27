'use strict'

const condenseWhitespace = require('condense-whitespace')
const { chain, replace } = require('lodash')

const {
  create: createBoardSize,
  regexCleanOutput
} = require('../../../identify/board/size')

const REPLACEMENT = '{{SIZE}}'

module.exports = ({ title: rawTitle, year, 'board size': boardSize }) => {
  if (!boardSize) return rawTitle

  // We remove the year for don't interfer in the board size detection
  const title = replace(rawTitle, year, '')

  const getBoardSize = createBoardSize({ replacement: REPLACEMENT })
  const { output } = getBoardSize(title)

  return chain(output)
    .replace(regexCleanOutput, '')
    .replace(RegExp(`${REPLACEMENT}|${boardSize}`, 'i'), `${boardSize}l `)
    .thru(condenseWhitespace)
    .value()
}
