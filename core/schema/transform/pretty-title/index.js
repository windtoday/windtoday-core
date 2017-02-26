'use strict'

const condenseWhitespace = require('condense-whitespace')
const { flow } = require('lodash')

const prettyBoardSize = require('./pretty-board-size')
const removePrice = require('./remove-price')
const prettyYear = require('./pretty-year')
const cleanWords = require('./clean-words')

module.exports = flow([
  removePrice,
  cleanWords,
  prettyBoardSize,
  prettyYear,
  condenseWhitespace
])
