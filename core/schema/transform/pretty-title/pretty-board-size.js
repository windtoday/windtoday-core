'use strict'

const { chain } = require('lodash')
const strmatch = require('str-match')()

const removeSpaces = require('../../../util/remove-spaces')
const boardSize = require('../../../identify/board/size')

function prettyBoardSize (str) {
  const {regex, regexCleanOutput} = boardSize
  const size = strmatch(str, regex)

  if (!size.test) return str

  return chain(str)
    .replace(size.match, removeSpaces(size.match).toUpperCase())
    .replace(regexCleanOutput, '')
    .value()
}

module.exports = prettyBoardSize
