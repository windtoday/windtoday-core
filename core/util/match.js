'use strict'

const mem = require('mem')

function match (str, regex) {
  regex.toJSON = regex.toString
  return str.match(regex)
}

module.exports = mem(match)
