'use strict'

const condenseWhitespace = require('condense-whitespace')
const price = require('../../../identify/price')

module.exports = ({ title }) => {
  const { output } = price(title)
  return condenseWhitespace(output)
}
