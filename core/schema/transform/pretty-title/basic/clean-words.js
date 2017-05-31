'use strict'

const cleanWords = require('../../../../util/clean-words')

function cleanTitleWords (item) {
  const {title} = item
  return cleanWords(title)
}

module.exports = cleanTitleWords
