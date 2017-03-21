'use strict'

const {size, inRange} = require('lodash')

const cleanTitleWords = require('../../util/clean-words')

const MIN_LENGTH = 1
const MAX_LENGTH = 141

const hasMinLength = length => inRange(length, MIN_LENGTH, MAX_LENGTH)

function isValidTitle (title) {
  const cleanTitle = cleanTitleWords(title)
  const sizeTitle = size(cleanTitle)

  return hasMinLength(sizeTitle)
}

module.exports = isValidTitle