'use strict'

const cleanWhiteSpaces = require('condense-whitespace')
const { flow } = require('lodash')

const prettyBoardSize = require('./pretty-board-size')
const removePrice = require('./remove-price')
const cleanWords = require('./clean-words')

module.exports = flow([
  removePrice,
  cleanWords,
  prettyBoardSize,
  cleanWhiteSpaces
])
