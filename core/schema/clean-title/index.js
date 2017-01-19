'use strict'

const titleize = require('titleize')
const { flow } = require('lodash')

const REGEX_WORDS = RegExp(require('./words.json').join('|'), 'ig')
const cleanWhiteSpaces = require('condense-whitespace')
const price = require('../../identify/price')
const boardSize = require('../../identify/board/size')

function cleanWords (str) {
  return str.replace(REGEX_WORDS, '')
}

function cleanPrice (str) {
  return price(str).output
}

function prettyBoardSize (str) {
  const {data, output} = boardSize(str)
  if (!data) return str
  return `${output} ${data}L`
}

module.exports = flow([
  cleanPrice,
  cleanWords,
  titleize,
  prettyBoardSize,
  cleanWhiteSpaces
])
