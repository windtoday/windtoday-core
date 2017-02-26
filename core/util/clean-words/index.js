'use strict'

const condenseWhitespace = require('condense-whitespace')

const words = require('./words.json')
const REGEX_WORDS = RegExp(words.join('|'), 'ig')

function cleanTitleWords (str) {
  const output = str.replace(REGEX_WORDS, '')
  return condenseWhitespace(output)
}

module.exports = cleanTitleWords
