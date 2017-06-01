'use strict'

const { assign, flow } = require('lodash')

const condenseWhiteSpace = require('./condene-white-space')
const cleanWords = require('./clean-words')
const boardSize = require('./board-size')
const sailSize = require('./sail-size')
const removePrice = require('./price')
const prettyYear = require('./year')

const assignItemTitle = (item, title) => assign({}, item, {title})

module.exports = flow([
  item => assignItemTitle(item, removePrice(item)),
  item => assignItemTitle(item, cleanWords(item)),
  item => assignItemTitle(item, boardSize(item)),
  item => assignItemTitle(item, sailSize(item)),
  item => assignItemTitle(item, prettyYear(item)),
  condenseWhiteSpace
])
