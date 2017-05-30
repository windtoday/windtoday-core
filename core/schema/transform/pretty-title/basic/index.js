'use strict'

const { assign, flow } = require('lodash')

const condenseWhiteSpace = require('./condene-white-space')
const cleanWords = require('./clean-title-words')
const removePrice = require('./remove-price')
const prettyYear = require('./pretty-year')

const assignItemTitle = (item, title) => assign({}, item, {title})

module.exports = flow([
  item => assignItemTitle(item, removePrice(item)),
  item => assignItemTitle(item, cleanWords(item)),
  item => assignItemTitle(item, prettyYear(item)),
  condenseWhiteSpace
])
