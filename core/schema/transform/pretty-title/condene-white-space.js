'use strict'

const condenseWhitespace = require('condense-whitespace')

function condenseWhitespaces (item) {
  const { title } = item
  return condenseWhitespace(title)
}

module.exports = condenseWhitespaces
