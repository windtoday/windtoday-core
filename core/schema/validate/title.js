'use strict'

const { size, words } = require('lodash')

const cleanTitleWords = require('../../util/clean-words')

const MAX_LENGTH = 140
const MIN_WORDS = 3

const isUnderMaxLength = length => length < MAX_LENGTH
const hasMinWords = length => length >= MIN_WORDS

function isValidTitle (title) {
  const cleanTitle = cleanTitleWords(title)
  const sizeTitle = size(cleanTitle)
  const wordsTitle = words(cleanTitle)
  const wordsLengthTitle = size(wordsTitle)

  return isUnderMaxLength(sizeTitle) && hasMinWords(wordsLengthTitle)
}

module.exports = isValidTitle
