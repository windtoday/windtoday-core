'use strict'

const condenseWhitespace = require('condense-whitespace')
const { flow } = require('lodash')

const cleanWords = require('../../../util/clean-words')
const prettyBoardSize = require('./pretty-board-size')
const removePrice = require('./remove-price')
const prettyYear = require('./pretty-year')

module.exports = flow([
  removePrice,
  cleanWords,
  prettyBoardSize,
  prettyYear,
  condenseWhitespace
])
