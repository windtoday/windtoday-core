'use strict'

const condenseWhitespace = require('condense-whitespace')
const { replace } = require('lodash')

module.exports = ({ title, year }) => {
  if (!year) return title
  const output = replace(title, year, '')
  return condenseWhitespace(`${output} ${year}`)
}
