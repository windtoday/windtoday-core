'use strict'

const condenseWhitespace = require('condense-whitespace')
const {size, flow, inRange} = require('lodash')

const cleanWords = require('../transform/pretty-title')

const MIN_LENGTH = 1
const MAX_LENGTH = 141

const hasMinLength = length => inRange(length, MIN_LENGTH, MAX_LENGTH)

const getTitle = flow([
  cleanWords,
  condenseWhitespace
])

function isValidTitle (title) {
  const cleanTitle = cleanWords(title)
  const sizeTitle = size(cleanTitle)

  return hasMinLength(sizeTitle)
}

module.exports = isValidTitle
