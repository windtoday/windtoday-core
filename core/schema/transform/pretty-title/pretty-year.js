'use strict'

const condenseWhitespace = require('condense-whitespace')
const year = require('../../../identify/year')

function prettyYear (str) {
  const {data, output} = year(str)
  const yearDetected = data.year
  if (!yearDetected) return str
  return condenseWhitespace(`${output} ${yearDetected}`)
}

module.exports = prettyYear
