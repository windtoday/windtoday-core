'use strict'

const { flow, trim, capitalize } = require('lodash')

const WORDS = require('./words.json').map(function (word) {
  return RegExp(word, 'i')
})

const SYMBOLS = require('./symbols.json')

const REGEX_WHITESPACE = /\s+/g

const REGEX_PRICE = require('../../identify/price').regex

function cleanWords (str) {
  WORDS.forEach(function (word) {
    str = str.replace(word, '')
  })

  return str
}

function cleanSymbols (str) {
  SYMBOLS.forEach(function (symbol) {
    str = str.replace(symbol, '')
  })

  return str
}

function cleanWhiteSpaces (str) {
  return str.replace(REGEX_WHITESPACE, ' ')
}

function cleanPrice (str) {
  return str.replace(REGEX_PRICE, '')
}

module.exports = flow([
  cleanWords,
  cleanPrice,
  cleanSymbols,
  cleanWhiteSpaces,
  trim,
  capitalize
])
