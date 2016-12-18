'use strict'

const REGEX_WORDS = RegExp(require('./words.json').join('|'), 'ig')
const cleanWhiteSpaces = require('condense-whitespace')
const price = require('../../identify/price')
const titleize = require('titleize')
const { flow } = require('lodash')

function cleanWords (str) {
  return str.replace(REGEX_WORDS, '')
}

function cleanPrice (str) {
  return price(str).output
}

module.exports = flow([
  cleanPrice,
  cleanWords,
  cleanWhiteSpaces,
  titleize
])
