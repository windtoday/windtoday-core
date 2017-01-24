'use strict'

const cleanWhiteSpaces = require('condense-whitespace')
const { flow, chain } = require('lodash')
const strmatch = require('str-match')()
const titleize = require('titleize')

const REGEX_WORDS = RegExp(require('./words.json').join('|'), 'ig')

const price = require('../../../identify/price')
const boardSize = require('../../../identify/board/size')

function cleanWords (str) {
  return str.replace(REGEX_WORDS, '')
}

function cleanPrice (str) {
  return price(str).output
}

function prettyBoardSize (str) {
  const {regex, regexCleanOutput} = boardSize
  const removeSpaces = (str) => str.replace(/\s+/g, '')
  const size = strmatch(str, regex)

  if (!size.test) return str

  return chain(str)
    .replace(size.match, removeSpaces(size.match).toUpperCase())
    .replace(regexCleanOutput, '')
    .value()
}

module.exports = flow([
  cleanPrice,
  cleanWords,
  titleize,
  prettyBoardSize,
  cleanWhiteSpaces
])
