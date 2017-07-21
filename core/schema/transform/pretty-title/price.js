'use strict'

const condenseWhitespace = require('condense-whitespace')
const price = require('../../../identify/price')

function removePrice (item) {
  const { title } = item
  const output = price(title).output
  return condenseWhitespace(output)
}

module.exports = removePrice
