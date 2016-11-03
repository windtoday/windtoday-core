'use strict'

const { flow } = require('lodash')
const titleize = require('titleize')
const cleanWhiteSpaces = require('condense-whitespace')

const REGEX_WORDS = RegExp(require('./words.json').join('|'), 'ig')
const REGEX_PRICE = RegExp(require('../../identify/price').regex, 'g')

function cleanWords (str) {
  return str.replace(REGEX_WORDS, '')
}

function cleanPrice (str) {
  return str.replace(REGEX_PRICE, '')
}

module.exports = flow([
  cleanPrice,
  cleanWords,
  cleanWhiteSpaces,
  titleize
])
