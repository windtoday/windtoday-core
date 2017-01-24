'use strict'

const cleanWhiteSpaces = require('condense-whitespace')
const price = require('../../../identify/price')

function removePrice (str) {
  const output = price(str).output
  return cleanWhiteSpaces(output)
}

module.exports = removePrice
