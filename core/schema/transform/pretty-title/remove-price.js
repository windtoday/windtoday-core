'use strict'

const condenseWhitespace = require('condense-whitespace')
const price = require('../../../identify/price')

function removePrice (str) {
  const output = price(str).output
  return condenseWhitespace(output)
}

module.exports = removePrice
