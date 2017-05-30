'use strict'

const condenseWhitespace = require('condense-whitespace')
const {replace} = require('lodash')

function prettyYear (item) {
  const {title, year} = item
  if (!year) return title

  const output = replace(title, year, '')
  return condenseWhitespace(`${output} ${year}`)
}

module.exports = prettyYear
